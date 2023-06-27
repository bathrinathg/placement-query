const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Product = mongoose.model("Product");
const Order = mongoose.model("Order");

router.get("/", requireLogin, async (req, res) => {
	try {
		if (!req.user.isAdmin) {
			return res
				.status(403)
				.json({ error: "Only admin can get all orders" });
		}

		const result = await Order.find({})
			.populate("bookId")
			.populate("createdBy")
			.sort({ createdAt: -1 })
			.lean();
		res.json({ result });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true });
	}
});

router.get("/myorders", requireLogin, async (req, res) => {
	try {
		const { _id: userId } = req.user;
		const result = await Order.find({ createdBy: userId })
			.populate("bookId")
			.sort({ createdAt: -1 })
			.lean();
		res.json({ result });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true });
	}
});

router.post("/", requireLogin, async (req, res) => {
	try {
		const { _id: userId } = req.user;
		const { bookId } = req.body;
		console.log({ bookId, body: req.body });
		if (!bookId) {
			return res.status(422).json({ error: "Please add all the fields" });
		}
		const book = await Product.findOne(
			{ _id: bookId },
			{ status: 1, copies: 1 }
		).lean();
		if (!book) {
			return res.status(422).json({ error: "Invalid Book" });
		}
		const { copies, status } = book;
		if (copies <= 0 || status === "UNAVAILABLE") {
			return res.status(422).json({ error: "Book is unavailable" });
		}
		const expectedReturnDate = new Date();
		expectedReturnDate.setDate(expectedReturnDate.getDate() + 2);

		const post = new Order({
			bookId,
			expectedReturnDate,
			createdBy: userId,
		});
		const result = await post.save();
		await Product.findByIdAndUpdate(
			{ _id: bookId },
			{
				$inc: { copies: -1 },
				...(copies === 1 ? { status: "UNAVAILABLE" } : {}),
			}
		).lean();
		res.json({ result });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: true });
	}
});

router.put("/:orderId", requireLogin, async (req, res) => {
	try {
		const { orderId } = req.params;
		const { status, returnedAt, lentAt } = req.body;

		const result = await Order.findOneAndUpdate(
			{ _id: orderId },
			{
				$set: {
					...(req.user.isAdmin
						? {
								...(returnedAt ? { returnedAt } : {}),
								...(lentAt ? { lentAt } : {}),
								status,
						  }
						: {
								status,
						  }),
				},
			},
			{ returnOriginal: "after" }
		).lean();

		if (!result) {
			return res
				.status(400)
				.json({ error: "Invalid Order Id provided in params" });
		}
		res.json({ result });
	} catch (error) {
		if (
			error.message &&
			error.message.startsWith("Cast to ObjectId failed")
		) {
			res.status(400).json({
				error: true,
				errMsg: "Invalid Product Id provided in params",
			});
		}
		console.log(error, { message: error.message });
		res.status(500).json({ error: true });
	}
});

module.exports = router;

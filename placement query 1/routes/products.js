const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Product = mongoose.model("Product");
const ProductRating = mongoose.model("ProductRating");
const Post = mongoose.model("Query");

router.get("/", requireLogin, async (req, res) => {
	try {
		const { type } = req.query;
		const result = await Product.find({})
			.sort({
				...(type
					? {
							[`avgRating.${type}.value`]: -1,
					  }
					: { totalRating: -1 }),
				createdAt: -1,
			})
			.lean();
		res.json({ result });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true });
	}
});

router.post("/", requireLogin, async (req, res) => {
	try {
		const {
			name,
			address,
			phoneNumber,
			images,
			description,
			type,
			status,
		} = req.body;
		// if (!name) {
		// 	return res.status(422).json({ error: "Please add all the fields" });
		// }

		// if (!req.user.isAdmin) {
		// 	return res
		// 		.status(403)
		// 		.json({ error: "Only admin can create product" });
		// }

		const post = new Product({
			name,
			address,
			phoneNumber,
			images,
			description,
			type,
			status,
			createdBy: req.user._id,
		});
		const result = await post.save();
		res.json({ result });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: true });
	}
});

router.get("/:productId", requireLogin, async (req, res) => {
	try {
		const { productId } = req.params;
		const [productObj, reviews] = await Promise.all([
			Post.findById(productId).populate("raisedBy", "_id name").lean(),
			ProductRating.find({ queryId: productId })
				.populate("createdBy", "_id name")
				.lean(),
		]);
		// const [productObj, reviews] = await Promise.all([
		// 	Product.findOne({ _id: productId }).lean(),
		// 	ProductRating.find({ productId }).lean(),
		// ]);

		// if (!productObj) {
		// 	return res
		// 		.status(400)
		// 		.json({ error: "Invalid Product Id provided in params" });
		// }
		const result = { ...productObj, reviews };
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

router.post("/:productId/rating", requireLogin, async (req, res) => {
	try {
		const { title, rating, images, description, type, ...rest } = req.body;
		const { productId } = req.params;
		// if (!title || !rating || !type) {
		// 	return res.status(422).json({ error: "Please add all the fields" });
		// }

		// console.log({ type });

		// const productObj = await Product.findOne(
		// 	{ _id: productId },
		// 	{ totalRating: 1, avgRating: 1 }
		// ).lean();

		// if (!productObj) {
		// 	return res
		// 		.status(400)
		// 		.json({ error: "Invalid Product Id provided in params" });
		// }

		// const averageRatingNew =
		// 	(productObj.avgRating[type].value || 0) +
		// 	(rating - (productObj.avgRating[type].value || 0)) /
		// 		((productObj.avgRating[type].totalRating || 0) + 1);
		const post = new ProductRating({
			title,
			rating,
			images,
			description,
			type,
			queryId: productId,
			...rest,
			createdBy: req.user._id,
		});
		// console.log({ averageRatingNew, typeAvg: productObj.avgRating[type] });
		const result = await post.save();
		// await Product.findOneAndUpdate(
		// 	{ _id: productId },
		// 	{
		// 		$inc: { totalRating: 1 },
		// 		[`avgRating.${type}`]: {
		// 			value: averageRatingNew,
		// 			totalRating:
		// 				(productObj.avgRating[type].totalRating || 0) + 1,
		// 		},
		// 	}
		// ).lean();
		res.json({ result });
	} catch (error) {
		console.log(error, { message: error.message });
		res.status(500).json({ error: true });
	}
});

module.exports = router;

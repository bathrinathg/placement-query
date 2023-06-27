const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const FileEvents = mongoose.model("FileEvents");
const User = mongoose.model("User");

router.get("/", requireLogin, (req, res) => {
	FileEvents.find({
		$or: [
			{
				users: { $in: [req.user._id] },
			},
			{ toAllUsers: true },
		],
	})
		.sort("-createdAt")
		.then((files) => {
			res.json({ files });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: true });
		});
});

router.post("/", requireLogin, async (req, res) => {
	try {
		const {
			name,
			fileUrl,
			users,
			description,
			sendToAllUsers = false,
		} = req.body;
		if (!users || !fileUrl) {
			return res.status(422).json({ error: "Please add all the fields" });
		}

		if (!req.user.isAdmin) {
			return res
				.status(422)
				.json({ error: "Only admin can upload file" });
		}

		const post = new FileEvents({
			name,
			fileUrl,
			users,
			description,
			createdBy: req.user._id,
			toAllUsers: sendToAllUsers,
		});
		const [result] = await Promise.all([
			post.save(),
		]);
		res.json({ file: result });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: true });
	}
});

module.exports = router;

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Query");
const Announcement = mongoose.model("Announcement");

router.get("/allpost", requireLogin, (req, res) => {
	const { status } = req.query;
	Post.find(status ? { status } : {})
		.populate("raisedBy", "_id name")
		.populate("comments.postedBy", "_id name")
		.sort("-createdAt")
		.then((posts) => {
			res.json({ posts });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get("/announcement", requireLogin, (req, res) => {
	Announcement.find({})
		.populate("createdBy", "_id name")
		.sort("-createdAt")
		.then((posts) => {
			res.json({ result: posts });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.post("/announcement", requireLogin, (req, res) => {
    const body = req.body;
	const post = new Announcement({
		...body,
		createdBy: req.user,
	});
	post.save()
		.then((result) => {
			res.json({ result });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get("/query/stats", requireLogin, async (req, res) => {
	try {
		const [totalCount, completedCount, pendingCount, meetInPersonCount] =
			await Promise.all([
				Post.count().lean(),
				Post.count({ status: "COMPLETED" }).lean(),
				Post.count({ status: "PENDING" }).lean(),
				Post.count({ status: "MEET IN PERSON" }).lean(),
			]);
		res.send({
			counts: {
				totalCount,
				completedCount,
				pendingCount,
				meetInPersonCount,
			},
		});
	} catch (error) {
		res.status(500).json({ error });
	}
});

router.put("/query/:id", requireLogin, (req, res) => {
	console.log({ status: req.body.status, id: req.params.id });
	Post.findByIdAndUpdate(req.params.id, {
		status: req.body.status,
	}).exec((err, result) => {
		if (err) {
			return res.status(422).json({ error: err });
		} else {
			res.json(result);
		}
	});
});

router.get("/query/:id", requireLogin, (req, res) => {
	console.log({ status: req.body.status, id: req.params.id });
	Post.findById(req.params.id)
		.populate("raisedBy", "_id name")
		.populate("comments.postedBy", "_id name")
		.exec((err, result) => {
			if (err) {
				return res.status(422).json({ error: err });
			} else {
				res.json(result);
			}
		});
});

router.get("/getsubpost", requireLogin, (req, res) => {
	// if postedBy in following
	Post.find({ postedBy: { $in: req.user.following } })
		.populate("postedBy", "_id name")
		.populate("comments.postedBy", "_id name")
		.sort("-createdAt")
		.then((posts) => {
			res.json({ posts });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.post("/createpost", requireLogin, (req, res) => {
	const body = req.body;
	const post = new Post({
		...body,
		raisedBy: req.user,
	});
	post.save()
		.then((result) => {
			res.json({ post: result });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get("/mypost", requireLogin, (req, res) => {
	Post.find({ raisedBy: req.user._id })
		.populate("raisedBy", "_id name")
		.then((mypost) => {
			res.json({ posts: mypost });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.put("/like", requireLogin, (req, res) => {
	Post.findByIdAndUpdate(
		req.body.postId,
		{
			$push: { likes: req.user._id },
		},
		{
			new: true,
		}
	).exec((err, result) => {
		if (err) {
			return res.status(422).json({ error: err });
		} else {
			res.json(result);
		}
	});
});
router.put("/unlike", requireLogin, (req, res) => {
	Post.findByIdAndUpdate(
		req.body.postId,
		{
			$pull: { likes: req.user._id },
		},
		{
			new: true,
		}
	).exec((err, result) => {
		if (err) {
			return res.status(422).json({ error: err });
		} else {
			res.json(result);
		}
	});
});

router.put("/comment", requireLogin, (req, res) => {
	const comment = {
		text: req.body.text,
		postedBy: req.user._id,
	};
	Post.findByIdAndUpdate(
		req.body.postId,
		{
			$push: { comments: comment },
		},
		{
			new: true,
		}
	)
		.populate("comments.postedBy", "_id name")
		.populate("raisedBy", "_id name")
		.exec((err, result) => {
			if (err) {
				return res.status(422).json({ error: err });
			} else {
				res.json(result);
			}
		});
});

router.delete("/deletepost/:postId", requireLogin, (req, res) => {
	Post.findOne({ _id: req.params.postId })
		.populate("raisedBy", "_id")
		.exec((err, post) => {
			if (err || !post) {
				return res.status(422).json({ error: err });
			}
			if (post.raisedBy._id.toString() === req.user._id.toString()) {
				post.remove()
					.then((result) => {
						res.json(result);
					})
					.catch((err) => {
						console.log(err);
					});
			}
		});
});

module.exports = router;

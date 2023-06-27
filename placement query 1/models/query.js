const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema(
	{
		subject: {
			type: String,
		},
		details: {
			type: String,
		},
		photo: {
			type: String,
		},
		conversation: [
			{
				userName: String,
				text: String,
				postedBy: { type: ObjectId, ref: "User" },
			},
		],
		status: {
			type: String,
			default: "PENDING",
		},
		raisedBy: {
			type: ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

mongoose.model("Query", postSchema);

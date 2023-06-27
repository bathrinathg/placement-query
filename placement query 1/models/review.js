const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
		},
		description: {
			type: String,
		},
		rating: {
			type: Number,
			default: 0,
		},
		queryIssuedAt: String,
		status: String,
		raisedBy: {
			type: ObjectId,
			ref: "User",
		},
		type: {
			type: String,
		},
		images: {
			type: [String],
		},
		queryId: {
			type: ObjectId,
			ref: "Query",
		},
		createdBy: {
			type: ObjectId,
			required: true,
			ref: "User",
		},
	},
	{ timestamps: true }
);

mongoose.model("ProductRating", postSchema);

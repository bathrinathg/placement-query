const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		description: {
			type: String,
		},
		fileUrl: {
			type: String,
			required: true,
		},
		users: {
			type: [ObjectId],
			ref: "User",
		},
		toAllUsers: {
			type: Boolean,
			default: false,
		},
		createdBy: {
			type: ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

mongoose.model("FileEvents", postSchema);

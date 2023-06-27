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
        attachments: [String],
		createdBy: {
			type: ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

mongoose.model("Announcement", postSchema);

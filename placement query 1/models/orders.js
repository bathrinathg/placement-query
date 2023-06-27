const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema(
	{
		bookId: {
			type: ObjectId,
			required: true,
			ref: "Product",
		},
		expectedReturnDate: {
			type: Date,
		},
		lentAt: Date,
		returnedAt: Date,
		status: {
			type: String,
			enum: [
				"REQUESTED",
				"ADMIN_APPROVED",
				"ADMIN_DECLINED",
				"RETURN_REQUESTED",
				"ADMIN_RETURN_VERIFIED",
				"PENDING_FINE",
			],
			default: "REQUESTED",
			index: true,
		},
		createdBy: {
			type: ObjectId,
			required: true,
			ref: "User",
		},
	},
	{ timestamps: true }
);

mongoose.model("Order", postSchema);

const mongoose = require("mongoose");

const { ObjectId, Mixed } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		address: {
			type: String,
		},
		phoneNumber: {
			type: String,
		},
		type: {
			type: String,
		},
		status: {
			type: String,
			enum: ["UNSOLVED", "IN_PROGRESS", "SOLVED"],
			default: "UNSOLVED",
		},
		description: {
			type: String,
		},
		avgRating: {
			hostelAndFood: {
				value: {
					type: Number,
					default: 0,
				},
				totalRating: {
					type: Number,
					default: 0,
				},
			},
			transportation: {
				value: {
					type: Number,
					default: 0,
				},
				totalRating: {
					type: Number,
					default: 0,
				},
			},
			jobOpportunities: {
				value: {
					type: Number,
					default: 0,
				},
				totalRating: {
					type: Number,
					default: 0,
				},
			},
			studentFaculty: {
				value: {
					type: Number,
					default: 0,
				},
				totalRating: {
					type: Number,
					default: 0,
				},
			},
			infrastructure: {
				value: {
					type: Number,
					default: 0,
				},
				totalRating: {
					type: Number,
					default: 0,
				},
			},
			sports: {
				value: {
					type: Number,
					default: 0,
				},
				totalRating: {
					type: Number,
					default: 0,
				},
			},
			extraCircular: {
				value: {
					type: Number,
					default: 0,
				},
				totalRating: {
					type: Number,
					default: 0,
				},
			},
		},
		totalRating: {
			type: Number,
			default: 0,
		},
		images: {
			type: [String],
		},
		createdBy: {
			type: ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

mongoose.model("Product", postSchema);

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	phoneNumber: String,
	isAdmin: { type: Boolean, default: false },
	resetToken: String,
	branch: String,
	rollNumber: String,
	admissionYear: Number,
	userType: {
		type: String,
		enum: ['STUDENT', 'TEACHER', 'PLACEMENT_ADMIN'],
		default: "STUDENT",
	},
	teacherId: String,
	teacherDepartment: String,
	teacherNumber: String,
	expireToken: Date,
	pic: {
		type: String,
		default:
			"https://res.cloudinary.com/cnq/image/upload/v1586197723/noimage_d4ipmd.png",
	},
	followers: [{ type: ObjectId, ref: "User" }],
	following: [{ type: ObjectId, ref: "User" }],
});

mongoose.model("User", userSchema);

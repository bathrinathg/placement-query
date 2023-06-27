const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const { MONGOURI } = require("./config/keys");

mongoose.connect(MONGOURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
	console.log("conneted to mongo yeahh");
});
mongoose.connection.on("error", (err) => {
	console.log("err connecting", err);
});

require("./models/user");
require("./models/query");
require("./models/fileEvents");
require("./models/product");
require("./models/review");
require("./models/orders");
require("./models/announcement");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/query"));
app.use(require("./routes/user"));
app.use('/order', require("./routes/Order"));
app.use("/file", require("./routes/fileUploads"));
app.use("/product", require("./routes/products"));

if (process.env.NODE_ENV == "production") {
	app.use(express.static("client/build"));
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log("server is running on", PORT);
});

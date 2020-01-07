const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 2000;
const customer = require("./routes/customer");
const user = require("./routes/user");
const register = require("./routes/register");
const auth = require("./routes/auth");
const config = require("config");
const db = process.env.db;
const error = require("./middleware/error");

//this is used to handle higher order error that escape express
process.on("unCaughtException", ex => {
	console.log(ex);
	wiston.error(ex.message, ex);
});

if (!config.get("privateKey")) {
	console.log("fatal error: PrivateKey not define");
	process.exit(1);
}

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log(`connected to ${db}`))
	.catch(err => console.log("could not connect", err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/customer", customer);
app.use("/api/user", user);
app.use("/api/register", register);
app.use("/api/auth", auth);
app.use(error);

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));

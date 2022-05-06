
const express = require("express");
const app = express();
const test = require("bcrypt");

require("dotenv").config();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const path = require("path");
const public = path.join(__dirname, "public");
app.use(express.static(public));

app.use(express.urlencoded({extended: false}));

const mustache = require("mustache-express");
app.engine("mustache", mustache());
app.set("view engine", "mustache");

const router = require("./routes/routes.js");
app.use("/", router);

app.listen(3000, () => {
    console.log("[DEV] Server started on port 3000. Press Ctrl^C to quit.");
});
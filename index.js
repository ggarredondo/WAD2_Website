
const express = require("express");
const app = express();

app.use(express.urlencoded({extended: false}));

const router = require("./routes/routes.js");
app.use("/", router);

const mustache = require("mustache-express");
app.engine("mustache", mustache());
app.set("view engine", "mustache");

app.listen(3000, () => {
    console.log("[DEV] Server started on port 3000. Press Ctrl^C to quit.");
});
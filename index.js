
const express = require("express");
const app = express();

app.use(express.urlencoded({extended: false}));

app.get("/", function(req, res) {
    res.send("In construction.");
});

app.listen(3000, () => {
    console.log("Server started on port 3000. Press Ctrl^C to quit.");
});
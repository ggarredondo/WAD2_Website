
const dishModel = require("../models/dishModel");
const dishDB = new dishModel();
dishDB.init();

exports.root = function(req, res) {
    res.render("root", {
        title: "Generic's"
    });
}

exports.staff = function(req, res) {
    res.send("Staff Login");
}

exports.menus = function(req, res) {
    res.send("Main, dessert, special. Lunch, dinner.");
    dishDB.getTypeDishes("main");
}

exports.newDish = function(req, res) {
    res.send("New dish");
}

exports.editDish = function(req, res) {
    res.send("Edit");
}

// errors

exports.notfound_error = function(req, res) {
    res.status(404);
    res.type("text/plain");
    res.send("Error 404 - Not Found.");
}

exports.internal_error = function(err, req, res, next) {
    res.status(500);
    res.type("text/plain");
    res.send("Internal Server Error.");
}
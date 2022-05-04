
const dishModel = require("../models/dishModel");
const dishDB = new dishModel("database/dish.db");

exports.root = function(req, res) {
    res.render("root", {
        title: "Generic's"
    });
}

exports.staff = function(req, res) {
    res.send("Staff Login");
}

exports.menus = async function(req, res) {
    res.render("menus", {
        title: "Generic's Menus",
        starter: await dishDB.getTypeDishes("starter").then((list) => {return list;}),
        main: await dishDB.getTypeDishes("main").then((list) => {return list;}),
        drink: await dishDB.getTypeDishes("starter").then((list) => {return list;}),
        lunch: await dishDB.getTypeDishes("lunch").then((list) => {return list;}),
        dinner: await dishDB.getTypeDishes("dinner").then((list) => {return list;})
    })
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
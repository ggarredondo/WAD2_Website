
const dishModel = require("../models/dishModel");
const dishDB = new dishModel("database/dish.db");

const staffModel = require("../models/staffModel");
const staffDB = new staffModel("database/staff.db");

exports.root = function(req, res) {
    res.render("root", {
        title: "Generic's"
    });
}

exports.menu = async function(req, res) {
    res.render("menu", {
        title: "Generic's Menu",
        starter: await dishDB.getTypeDishes("starter").then((list) => {return list;}),
        main: await dishDB.getTypeDishes("main").then((list) => {return list;}),
        drink: await dishDB.getTypeDishes("starter").then((list) => {return list;}),
        lunch: await dishDB.getTypeDishes("lunch").then((list) => {return list;}),
        dinner: await dishDB.getTypeDishes("dinner").then((list) => {return list;})
    });
}

exports.newDish = function(req, res) {
    res.send("New dish");
}

exports.updateDish = function(req, res) {
    res.send("Update");
}

// login

exports.staff = function(req, res) {
    res.render("staff",{
        title: "Generic's Staff"
    })
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
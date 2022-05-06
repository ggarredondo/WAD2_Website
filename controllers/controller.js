
const dishDAO = require("../models/dishModel");

exports.root = function(req, res) {
    res.render("root", {
        title: "Generic's",
        jwt: req.cookies.jwt
    });
}

exports.menu = async function(req, res) {
    res.render("menu", {
        title: "Generic's Menu",
        starter: await dishDAO.getTypeDishes("starter", true).then((list) => {return list;}),
        main: await dishDAO.getTypeDishes("main", true).then((list) => {return list;}),
        drink: await dishDAO.getTypeDishes("drink", true).then((list) => {return list;}),
        lunch: await dishDAO.getTypeDishes("lunch", true).then((list) => {return list;}),
        dinner: await dishDAO.getTypeDishes("dinner", true).then((list) => {return list;}),
        unavailable: await dishDAO.getAllDishes(false).then((list) => {return list;}),
        jwt: req.cookies.jwt
    });
}

exports.newDish = function(req, res) {
    res.render("newDish", {
        title: "Generic's New Dish"
    })
}

exports.post_newDish = function(req, res) {
    dishDAO.insertDish(req.body.name, 
                    req.body.ingredients, 
                    req.body.allergy_advice,
                    req.body.price,
                    req.body.type,
                    req.body.available);
    res.redirect("/menu");
}

exports.updateDish = function(req, res) {
    res.send("Update");
}

exports.availDish = function(req, res) {
    dishDAO.avail(req.url.substring(7,req.url.length), true);
    res.redirect("/menu");
}

exports.unavailDish = function(req, res) {
    dishDAO.avail(req.url.substring(9,req.url.length), false);
    res.redirect("/menu");
}

// login

exports.staff = function(req, res) {
    res.render("staff", {
        title: "Generic's Staff"
    });
}

exports.logout = function(req, res) {
    res
        .clearCookie("jwt")
        .status(200)
        .redirect("/");
}

exports.post_login = function(req, res) {
    res.redirect("/");
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
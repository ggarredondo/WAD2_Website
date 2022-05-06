
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const staffDAO = require("../models/staffModel");

exports.login = function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    staffDAO.lookUp(username, function(err, user) {
        if (err) {
            console.log("[DEV] Error looking up user", username);
            res.status(401).send();
        }
        if (!user) {
            return res.render("staff", {
                title: "Generic's Staff",
                name_error: "y"
            });
        }
        bcrypt.compare(password, user.password, function(err, result) {
            if (result) {
                let accessToken = jwt.sign({username: username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 300});
                res.cookie("jwt", accessToken);
                next();
            }
            else {
                res.render("staff", {
                    title: "Generic's Staff",
                    pass_error: "y"
                });
            }
        });
    });   
}

exports.verify = function(req, res, next) {
    let accessToken = req.cookies.jwt;
    if (!accessToken) {
        console.log("[DEV] No access token");
        return res.status(402).send();
    }
    try {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        next();
    }
    catch (err) {
        console.log("[DEV] Error verifying user");
        res.status(401).send();
    }
}
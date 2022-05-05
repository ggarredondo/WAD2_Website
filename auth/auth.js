
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const staffDAO = require("../models/staffModel");

exports.login = function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    staffDAO.lookUp(username, function(err, user) {
        if (!user) {
            return res.render("staff", {
                title: "Generic's Staff",
                name_error: "y"
            });
        }
        bcrypt.compare(password, user.password, function(err, result) {
            if (result) {
                res.send("VICTORY ROYALE");
                //let accessToken = jwt.sign({username: username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 300});
                //res.cookie("jwt", accessToken);
                //next();
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
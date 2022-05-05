
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const staffDAO = require("../models/staffModel");

exports.login = function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    staffDAO.lookUp(username, function(err, user) {

    });
}
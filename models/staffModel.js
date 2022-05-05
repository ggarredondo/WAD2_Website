
const Datastore = require("nedb");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class Staff {
    constructor(path) {
        if (path) {
            this.db = new Datastore({ filename: path, autoload: true });
            console.log("[DEV] Staff Database connected to " + path);
        }
        else {
            this.db = new Datastore();
            console.log("[DEV] Staff Database running in-memory");
        }
    }

    init() {
        this.db.insert({
            username: "kerry_copo",
            password: "$2a$10$gc0mlaDSVYevC0LXUYTTU.Pl71ZlzPlf.OZY9aiUjTrC75YHV.uv.",
            birth_date: "01/07/1999",
            position: "chef"
        });
    }

    create(_username, _password, _birth_date, _position) {
        const that = this;
        bcrypt.hash(_password, saltRounds).then((hash) => {
            var entry = {
                username: _username,
                password: hash,
                birth_date: _birth_date,
                position: _position
            }
            that.db.insert(entry, function(err) {
                err ? console.log("[DEV] Can't insert user", _username) : console.log("[DEV] Inserted user", _username);
            });
        });
    }

    lookUp(_username, cb) {
        this.db.find({username: _username}, function(err, user) {
            if (err || user.length == 0) {
                if (err) console.log("[DEV] Error looking up user", _username);
                else if (user.length == 0) console.log("[DEV] Couldn't find user", _username);
                return cb(err, null);
            }
            else
                return cb(err, user[0]);
        });
    }
}

const staffDAO = new Staff("database/staff.db");
module.exports = staffDAO;
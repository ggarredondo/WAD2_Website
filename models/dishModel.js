
const Datastore = require("nedb");

class Dish {
    constructor(path) {
        if (path) {
            this.db = new Datastore({ filename: path, autoload: true });
            console.log("[DEV] Dish Database connected to " + path);
        }
        else {
            this.db = new Datastore();
            console.log("[DEV] Dish Database running in-memory");
        }
    }

    getAllDishes() {
        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, dishes) {
                if (err)
                    reject(err);
                else {
                    resolve(dishes);
                    console.log("[DEV] returned all dishes");
                }
            });
        });
    }

    getTypeDishes(_type) {
        return new Promise((resolve, reject) => {
            this.db.find({type: _type}, function(err, dishes) {
                if (err)
                    reject(err);
                else {
                    resolve(dishes);
                    console.log("[DEV] returned", _type, "dishes");
                }
            });
        });
    }
}

module.exports = Dish;

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

    getAllDishes(_available) {
        return new Promise((resolve, reject) => {
            this.db.find({available: _available}, function(err, dishes) {
                if (err)
                    reject(err);
                else
                    resolve(dishes);
            });
        });
    }

    getTypeDishes(_type, _available) {
        return new Promise((resolve, reject) => {
            this.db.find({type: _type, available: _available}, function(err, dishes) {
                if (err)
                    reject(err);
                else
                    resolve(dishes);
            });
        });
    }

    insertDish(_name, _ingredients, _allergy_advice, _price, _type, _available) {
        var entry = {
            name: _name,
            ingredients: _ingredients,
            allergy_advice: _allergy_advice,
            price: _price,
            type: _type,
            available: _available
        }
        this.db.insert(entry, function(err, dish) {
            err ? console.log("[DEV] Error inserting dish", dish) : console.log("[DEV] Inserted dish", dish);
        });
    }

    avail(id, change) {
        this.db.update({_id: id}, {$set: {available: change}}, function(err, num) {
            if (err)
                console.log("[DEV] Error making dish availability", change);
            else
                console.log("[DEV] Changed dish availability to", change);
        });
    }
}

const dishDAO = new Dish("database/dish.db");
module.exports = dishDAO;
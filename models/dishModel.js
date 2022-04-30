
const nedb = require("nedb");

class Dish {
    constructor(path) {
        if (path) {
            this.db = new nedb({ filename: path, autoload: true });
            console.log("[DEV] Dish Database connected to " + path);
        }
        else
            this.db = new nedb();
    }
    
    init() {
        this.db.insert({
            name: "carbonara spaghetti",
            ingredients: "egg, cream, bacon, spaghetti",
            allergy_advice: "lactose",
            price: "10",
            available: "yes",
            type: "main"
        });
    }

    getAllDishes() {
        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, dishes) {
                if (err)
                    reject(err);
                else {
                    resolve(dishes);
                    console.log("[DEV] all dishes: ", dishes);
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
                    console.log(_type, "[DEV] dishes: ", dishes);
                }
            });
        });
    }
}

module.exports = Dish;
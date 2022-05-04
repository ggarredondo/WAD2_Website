
const nedb = require("nedb");

class Staff {
    constructor(path) {
        if (path) {
            this.db = new nedb({ filename: path, autoload: true });
            console.log("[DEV] Staff Database connected to " + path);
        }
        else {
            this.db = new nedb();
            console.log("[DEV] Staff Database running in-memory");
        }
    }

    init() {
        this.db.insert({
            name: "Joe",
            last_name: "Moe",
            password: "testpassword",
            birth_date: "07/07/2000",
            position: "chef"
        });
    }
}

module.exports = Staff;
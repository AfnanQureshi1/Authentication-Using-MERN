var db = require("../models");
//createUsers();

async function createUsers() {
    console.log("********* seed.js createUsers *************")

    await db.User.create({
        username: "root",
        password: "",
    });

}

module.exports = {
    createUsers : createUsers,
}
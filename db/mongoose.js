const mongoose = require("mongoose");
require("dotenv").config();
const dbURL = process.env.DB_URL;
module.exports = () => {
    mongoose
        .connect(dbURL)
        .then(() => {
            console.log("Mongoose connected successfully and is open to ", dbURL);
        })
        .catch((err) => {
            console.log("Unable to connect to data base", err);
        });
    mongoose.connection.on("disconnected", function () {
        console.log("Mongoose connection is disconnected");
    });
};

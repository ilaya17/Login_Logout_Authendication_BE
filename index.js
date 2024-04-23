const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const mongoose = require("mongoose");
require("dotenv").config();
require("./db/mongoose")();
const authRoute = require("./routes/auth");
const deleteRoute = require("./routes/delete")


const app = express();
app.use(
    cors()
);

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(session({ secret: "keyboard cat", cookie: { maxAge: 60000 } }));

app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
    res.send({
        message: "Hii I am AB",
    });
});

app.use("/auth", authRoute);
app.use("/delete", deleteRoute);

app.listen("5000", () => {
    console.log("Server is running succssfully!");
});
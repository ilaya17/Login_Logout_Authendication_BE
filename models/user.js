
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
        accountId: {
            type: String,
            unique: true,
        },

        picture: {
            type: String,
        },
        provider: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

exports.User = mongoose.model("user", UserSchema);

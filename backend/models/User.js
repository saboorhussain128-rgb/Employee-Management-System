/*
==================================================
USER MODEL
Employee Management System
==================================================
*/

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: [
            "HR",
            "Finance",
            "Manager",
            "Employee"
        ],
        default: "HR"
    },

    status: {
        type: String,
        enum: [
            "Active",
            "Inactive"
        ],
        default: "Active"
    }

}, {

    timestamps: true

});

module.exports = mongoose.model("User", userSchema);
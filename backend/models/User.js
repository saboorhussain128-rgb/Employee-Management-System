/*
==================================================
USER MODEL
Employee Management System
==================================================
*/

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(

    {

        /* ==========================================
           BASIC INFORMATION
        ========================================== */

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

        /* ==========================================
           ROLE
        ========================================== */

        role: {

            type: String,

            enum: [

                "HR",

                "Employee",

                "Manager",

                "Finance"

            ],

            default: "Employee"

        },

        /* ==========================================
           EMPLOYEE INFORMATION
        ========================================== */

        phone: {

            type: String,

            default: ""

        },

        gender: {

            type: String,

            enum: [

                "Male",

                "Female",

                "Other"

            ],

            default: "Male"

        },

        department: {

            type: String,

            default: ""

        },

        designation: {

            type: String,

            default: ""

        },

        joiningDate: {

            type: Date

        },

        salary: {

            type: Number,

            default: 0

        },

        status: {

            type: String,

            enum: [

                "Active",

                "Inactive"

            ],

            default: "Active"

        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model(

    "User",

    userSchema

);
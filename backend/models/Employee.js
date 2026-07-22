/*
==================================================
EMPLOYEE MODEL
Employee Management System
==================================================
*/

const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(

    {

        /* ==========================================
           BASIC INFORMATION
        ========================================== */

        employeeId: {

            type: String,

            unique: true,

            required: true,

            trim: true

        },

        name: {

            type: String,

            required: true,

            trim: true

        },

        email: {

            type: String,

            required: true,

            unique: true,

            lowercase: true,

            trim: true

        },

        phone: {

            type: String,

            required: true,

            trim: true

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

        /* ==========================================
           ORGANIZATION
        ========================================== */

        department: {

            type: String,

            required: true,

            trim: true

        },

        designation: {

            type: String,

            required: true,

            trim: true

        },

        joiningDate: {

            type: Date,

            required: true

        },

        salary: {

            type: Number,

            default: 0

        },

        /* ==========================================
           PERSONAL INFORMATION
        ========================================== */

        address: {

            type: String,

            default: ""

        },

        emergencyContact: {

            type: String,

            default: ""

        },

        bloodGroup: {

            type: String,

            default: ""

        },

        photo: {

            type: String,

            default: ""

        },

        /* ==========================================
           STATUS
        ========================================== */

        status: {

            type: String,

            enum: [

                "Active",

                "Inactive"

            ],

            default: "Active"

        },

        /* ==========================================
           CREATED BY
        ========================================== */

        createdBy: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User"

        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model(

    "Employee",

    employeeSchema

);
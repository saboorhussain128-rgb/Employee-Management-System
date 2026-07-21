/*
==================================================
SEED HR USER
Employee Management System
==================================================
*/

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const path = require("path");

// Load Environment Variables
dotenv.config({
    path: path.join(__dirname, "../../.env")
});

// User Model
const User = require("../models/User");

// Connect MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });

// Seed Function
const seedHR = async () => {

    try {

        // Check if HR already exists
        const existingHR = await User.findOne({
            username: "hradmin"
        });

        if (existingHR) {

            console.log("⚠️ HR User already exists.");

            mongoose.connection.close();

            return;

        }

        // Encrypt Password
        const hashedPassword = await bcrypt.hash("hr123", 10);

        // Create HR User
        const hrUser = new User({

            name: "HR Administrator",

            username: "hradmin",

            email: "hr@company.com",

            password: hashedPassword,

            role: "HR",

            status: "Active"

        });

        await hrUser.save();

        console.log("======================================");
        console.log("✅ HR User Created Successfully");
        console.log("======================================");
        console.log("Username : hradmin");
        console.log("Password : hr123");
        console.log("======================================");

        mongoose.connection.close();

    } catch (error) {

        console.log(error);

        mongoose.connection.close();

    }

};

// Execute
seedHR();
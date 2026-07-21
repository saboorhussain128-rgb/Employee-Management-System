/*
==================================================
Employee Management System
Main Server File
==================================================
*/

const express = require("express");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");

// Load Environment Variables
dotenv.config();

const connectDB = require("./config/db");
const indexRoutes = require("./routes/indexRoutes");

// Connect Database
connectDB();

const app = express();

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session Configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

// View Engine
app.set("view engine", "ejs");

app.set(
    "views",
    path.join(__dirname, "../frontend/views")
);

// Static Files
app.use(
    express.static(
        path.join(__dirname, "../frontend/public")
    )
);

// Routes
app.use("/", indexRoutes);

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("========================================");
    console.log("Employee Management System Started");
    console.log("========================================");
    console.log(`Server : http://localhost:${PORT}`);
    console.log("========================================");

});
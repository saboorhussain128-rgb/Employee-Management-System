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

// Database
const connectDB = require("./config/db");

// Routes
const indexRoutes = require("./routes/indexRoutes");
const authRoutes = require("./routes/authRoutes");

// Connect Database
connectDB();

const app = express();

/* ==================================================
   BODY PARSER
================================================== */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ==================================================
   SESSION
================================================== */

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

/* ==================================================
   VIEW ENGINE
================================================== */

app.set("view engine", "ejs");

app.set(
    "views",
    path.join(__dirname, "../frontend/views")
);

/* ==================================================
   STATIC FILES
================================================== */

app.use(
    express.static(
        path.join(__dirname, "../frontend/public")
    )
);

/* ==================================================
   ROUTES
================================================== */

app.use("/", indexRoutes);
app.use("/", authRoutes);

/* ==================================================
   SERVER
================================================== */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("========================================");
    console.log("Employee Management System Started");
    console.log("========================================");
    console.log(`Server : http://localhost:${PORT}`);
    console.log("========================================");

});
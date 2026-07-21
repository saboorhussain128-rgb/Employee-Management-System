/*
==================================================
AUTH CONTROLLER
Employee Management System
==================================================
*/

const User = require("../models/User");
const bcrypt = require("bcryptjs");

/* ==================================================
   HR SETUP PAGE
================================================== */

exports.hrSetupPage = (req, res) => {

    res.render("auth/hr-setup", {
        error: null
    });

};

/* ==================================================
   CREATE HR ACCOUNT
================================================== */

exports.createHR = async (req, res) => {

    try {

        const {
            name,
            username,
            email,
            password,
            confirmPassword
        } = req.body;

        // Validate Fields
        if (
            !name ||
            !username ||
            !email ||
            !password ||
            !confirmPassword
        ) {

            return res.render("auth/hr-setup", {
                error: "All fields are required."
            });

        }

        // Check Password
        if (password !== confirmPassword) {

            return res.render("auth/hr-setup", {
                error: "Passwords do not match."
            });

        }

        // Check Username
        const usernameExists = await User.findOne({
            username
        });

        if (usernameExists) {

            return res.render("auth/hr-setup", {
                error: "Username already exists."
            });

        }

        // Check Email
        const emailExists = await User.findOne({
            email
        });

        if (emailExists) {

            return res.render("auth/hr-setup", {
                error: "Email already exists."
            });

        }

        // Encrypt Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create HR
        const hrUser = new User({

            name,

            username,

            email,

            password: hashedPassword,

            role: "HR",

            status: "Active"

        });

        await hrUser.save();

        // Redirect to Login
        res.redirect("/hr/login");

    } catch (error) {

        console.log(error);

        res.render("auth/hr-setup", {
            error: "Something went wrong."
        });

    }

};

/* ==================================================
   HR LOGIN PAGE
================================================== */

exports.hrLoginPage = (req, res) => {

    res.render("auth/hr-login", {
        error: null
    });

};

/* ==================================================
   HR LOGIN
================================================== */

exports.hrLogin = async (req, res) => {

    try {

        const { username, password } = req.body;

        if (!username || !password) {

            return res.render("auth/hr-login", {
                error: "Username and Password are required."
            });

        }

        const user = await User.findOne({
            username
        });

        if (!user) {

            return res.render("auth/hr-login", {
                error: "Invalid Username or Password."
            });

        }

        if (user.role !== "HR") {

            return res.render("auth/hr-login", {
                error: "Access Denied."
            });

        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.render("auth/hr-login", {
                error: "Invalid Username or Password."
            });

        }

        req.session.user = {

            id: user._id,

            name: user.name,

            username: user.username,

            role: user.role

        };

        res.redirect("/hr/dashboard");

    } catch (error) {

        console.log(error);

        res.render("auth/hr-login", {
            error: "Something went wrong."
        });

    }

};

/* ==================================================
   HR DASHBOARD
================================================== */

exports.hrDashboard = (req, res) => {

    res.render("hr/dashboard", {

        user: req.session.user

    });

};

/* ==================================================
   LOGOUT
================================================== */

exports.logout = (req, res) => {

    req.session.destroy(() => {

        res.redirect("/hr/login");

    });

};
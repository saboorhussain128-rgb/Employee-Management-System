/*
==================================================
EMPLOYEE CONTROLLER
Employee Management System
==================================================
*/

const User = require("../models/User");
const bcrypt = require("bcryptjs");

/* ==================================================
   CREATE EMPLOYEE PAGE
================================================== */

exports.createEmployeePage = (req, res) => {

    res.render("employees/createEmployee", {

        title: "Create Employee",

        user: req.session.user,

        error: null

    });

};

/* ==================================================
   SAVE EMPLOYEE
================================================== */

exports.createEmployee = async (req, res) => {

    try {

        const {

            name,
            username,
            email,
            password,
            phone,
            gender,
            department,
            designation,
            joiningDate,
            salary,
            status

        } = req.body;

        if (
            !name ||
            !username ||
            !email ||
            !password
        ) {

            return res.render("employees/createEmployee", {

                title: "Create Employee",

                user: req.session.user,

                error: "Please fill all required fields."

            });

        }

        const usernameExists = await User.findOne({

            username

        });

        if (usernameExists) {

            return res.render("employees/createEmployee", {

                title: "Create Employee",

                user: req.session.user,

                error: "Username already exists."

            });

        }

        const emailExists = await User.findOne({

            email

        });

        if (emailExists) {

            return res.render("employees/createEmployee", {

                title: "Create Employee",

                user: req.session.user,

                error: "Email already exists."

            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const employee = new User({

            name,

            username,

            email,

            password: hashedPassword,

            role: "Employee",

            phone,

            gender,

            department,

            designation,

            joiningDate,

            salary,

            status

        });

        await employee.save();

        res.redirect("/hr/employees");

    }

    catch (error) {

        console.log(error);

        res.render("employees/createEmployee", {

            title: "Create Employee",

            user: req.session.user,

            error: "Something went wrong."

        });

    }

};

/* ==================================================
   VIEW EMPLOYEES
================================================== */

exports.viewEmployeesPage = async (req, res) => {

    try {

        const employees = await User.find({

            role: "Employee"

        }).sort({

            createdAt: -1

        });

        res.render("employees/viewEmployees", {

            title: "Employees",

            user: req.session.user,

            employees

        });

    }

    catch (error) {

        console.log(error);

    }

};

/* ==================================================
   EDIT PAGE
================================================== */

exports.editEmployeePage = async (req, res) => {

    try {

        const employee = await User.findById(

            req.params.id

        );

        res.render("employees/editEmployee", {

            title: "Edit Employee",

            user: req.session.user,

            employee

        });

    }

    catch (error) {

        console.log(error);

    }

};

/* ==================================================
   UPDATE EMPLOYEE
================================================== */

exports.updateEmployee = async (req, res) => {

    try {

        await User.findByIdAndUpdate(

            req.params.id,

            req.body

        );

        res.redirect("/hr/employees");

    }

    catch (error) {

        console.log(error);

    }

};

/* ==================================================
   DELETE EMPLOYEE
================================================== */

exports.deleteEmployee = async (req, res) => {

    try {

        await User.findByIdAndDelete(

            req.params.id

        );

        res.redirect("/hr/employees");

    }

    catch (error) {

        console.log(error);

    }

};
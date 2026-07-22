/*
==================================================
EMPLOYEE CONTROLLER
Employee Management System
==================================================
*/

const Employee = require("../models/Employee");

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
   CREATE EMPLOYEE
================================================== */

exports.createEmployee = async (req, res) => {

    try {

        const {

            employeeId,

            name,

            email,

            phone,

            gender,

            department,

            designation,

            joiningDate,

            salary,

            address,

            emergencyContact,

            bloodGroup,

            status

        } = req.body;

        // Required Fields

        if (

            !employeeId ||

            !name ||

            !email ||

            !phone ||

            !department ||

            !designation ||

            !joiningDate

        ) {

            return res.render(

                "employees/createEmployee",

                {

                    title: "Create Employee",

                    user: req.session.user,

                    error: "Please fill all required fields."

                }

            );

        }

        // Check Employee ID

        const employeeExists = await Employee.findOne({

            employeeId

        });

        if (employeeExists) {

            return res.render(

                "employees/createEmployee",

                {

                    title: "Create Employee",

                    user: req.session.user,

                    error: "Employee ID already exists."

                }

            );

        }

        // Check Email

        const emailExists = await Employee.findOne({

            email

        });

        if (emailExists) {

            return res.render(

                "employees/createEmployee",

                {

                    title: "Create Employee",

                    user: req.session.user,

                    error: "Email already exists."

                }

            );

        }

        // Save Employee

        const employee = new Employee({

            employeeId,

            name,

            email,

            phone,

            gender,

            department,

            designation,

            joiningDate,

            salary,

            address,

            emergencyContact,

            bloodGroup,

            status,

            createdBy: req.session.user.id

        });

        await employee.save();

        res.redirect("/hr/employees");

    }

    catch (error) {

        console.log(error);

        res.render(

            "employees/createEmployee",

            {

                title: "Create Employee",

                user: req.session.user,

                error: "Something went wrong."

            }

        );

    }

};

/* ==================================================
   VIEW EMPLOYEES
================================================== */

exports.viewEmployees = async (req, res) => {

    try {

        const employees = await Employee.find()

            .sort({

                createdAt: -1

            });

        res.render(

            "employees/viewEmployees",

            {

                title: "Employees",

                user: req.session.user,

                employees

            }

        );

    }

    catch (error) {

        console.log(error);

    }

};

/* ==================================================
   EDIT EMPLOYEE PAGE
================================================== */

exports.editEmployeePage = async (req, res) => {

    try {

        const employee = await Employee.findById(

            req.params.id

        );

        res.render(

            "employees/editEmployee",

            {

                title: "Edit Employee",

                user: req.session.user,

                employee

            }

        );

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

        await Employee.findByIdAndUpdate(

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

        await Employee.findByIdAndDelete(

            req.params.id

        );

        res.redirect("/hr/employees");

    }

    catch (error) {

        console.log(error);

    }

};
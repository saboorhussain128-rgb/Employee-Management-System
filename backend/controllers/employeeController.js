/*
==================================================
EMPLOYEE CONTROLLER
Employee Management System
==================================================
*/

/* ==================================================
   CREATE EMPLOYEE PAGE
================================================== */

exports.createEmployeePage = (req, res) => {

    res.render("employees/create", {

        title: "Create Employee",

        user: req.session.user

    });

};


/* ==================================================
   VIEW EMPLOYEES PAGE
================================================== */

exports.viewEmployeesPage = (req, res) => {

    res.render("employees/index", {

        title: "View Employees",

        user: req.session.user,

        employees: []

    });

};
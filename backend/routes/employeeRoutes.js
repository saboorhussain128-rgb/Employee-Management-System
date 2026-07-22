/*
==================================================
EMPLOYEE ROUTES
Employee Management System
==================================================
*/

const express = require("express");

const router = express.Router();

const employeeController = require("../controllers/employeeController");

const authMiddleware = require("../middleware/authMiddleware");

/* ==================================================
   CREATE EMPLOYEE
================================================== */

router.get(

    "/hr/employees/create",

    authMiddleware.isHRLoggedIn,

    employeeController.createEmployeePage

);

/* ==================================================
   VIEW EMPLOYEES
================================================== */

router.get(

    "/hr/employees",

    authMiddleware.isHRLoggedIn,

    employeeController.viewEmployeesPage

);

module.exports = router;
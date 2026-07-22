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

router.post(

    "/hr/employees/create",

    authMiddleware.isHRLoggedIn,

    employeeController.createEmployee

);

/* ==================================================
   VIEW EMPLOYEES
================================================== */

router.get(

    "/hr/employees",

    authMiddleware.isHRLoggedIn,

    employeeController.viewEmployeesPage

);

/* ==================================================
   EDIT EMPLOYEE
================================================== */

router.get(

    "/hr/employees/edit/:id",

    authMiddleware.isHRLoggedIn,

    employeeController.editEmployeePage

);

router.post(

    "/hr/employees/edit/:id",

    authMiddleware.isHRLoggedIn,

    employeeController.updateEmployee

);

/* ==================================================
   DELETE EMPLOYEE
================================================== */

router.get(

    "/hr/employees/delete/:id",

    authMiddleware.isHRLoggedIn,

    employeeController.deleteEmployee

);

module.exports = router;
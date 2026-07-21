/*
==================================================
AUTH ROUTES
Employee Management System
==================================================
*/

const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const hrController = require("../controllers/hrController");

const authMiddleware = require("../middleware/authMiddleware");

/* ==================================================
   HR SETUP
================================================== */

// Display HR Setup Page
router.get(
    "/hr/setup",
    authController.hrSetupPage
);

// Create HR Account
router.post(
    "/hr/setup",
    authController.createHR
);

/* ==================================================
   HR LOGIN
================================================== */

// Display Login Page
router.get(
    "/hr/login",
    authController.hrLoginPage
);

// Login
router.post(
    "/hr/login",
    authController.hrLogin
);

/* ==================================================
   HR DASHBOARD
================================================== */

router.get(
    "/hr/dashboard",
    authMiddleware.isHRLoggedIn,
    hrController.dashboard
);

/* ==================================================
   LOGOUT
================================================== */

router.get(
    "/logout",
    authController.logout
);

module.exports = router;
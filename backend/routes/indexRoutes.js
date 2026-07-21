/*
==================================================
INDEX ROUTES
Employee Management System
==================================================
*/

const express = require("express");

const router = express.Router();

const User = require("../models/User");

/* ==================================================
   LANDING PAGE
================================================== */

router.get("/", async (req, res) => {

    try {

        const hrExists = await User.findOne({

            role: "HR"

        });

        res.render("index", {

            hrExists

        });

    }

    catch (error) {

        console.log(error);

        res.render("index", {

            hrExists: null

        });

    }

});

module.exports = router;
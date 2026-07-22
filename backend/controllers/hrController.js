/*
==================================================
HR CONTROLLER
Employee Management System
==================================================
*/

const User = require("../models/User");

/* ==================================================
   HR DASHBOARD
================================================== */

exports.dashboard = async (req, res) => {

    try {

        // Total Employees
        const totalEmployees = await User.countDocuments({
            role: "Employee"
        });

        // Total Managers
        const totalManagers = await User.countDocuments({
            role: "Manager"
        });

        // Total Finance Users
        const totalFinance = await User.countDocuments({
            role: "Finance"
        });

        // Pending Leaves
        // (Leave module not created yet)
        const pendingLeaves = 0;

        res.render("hr/dashboard", {

            title: "HR Dashboard",

            user: req.session.user,

            stats: {

                totalEmployees,

                totalManagers,

                totalFinance,

                pendingLeaves

            }

        });

    } catch (error) {

        console.log("HR Dashboard Error:", error);

        res.render("hr/dashboard", {

            title: "HR Dashboard",

            user: req.session.user,

            stats: {

                totalEmployees: 0,

                totalManagers: 0,

                totalFinance: 0,

                pendingLeaves: 0

            }

        });

    }

};
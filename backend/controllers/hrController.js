/*
==================================================
HR CONTROLLER
Employee Management System
==================================================
*/

/* ==================================================
   HR DASHBOARD
================================================== */

exports.dashboard = (req, res) => {

    res.render("hr/dashboard", {

        title: "HR Dashboard",

        user: req.session.user

    });

};
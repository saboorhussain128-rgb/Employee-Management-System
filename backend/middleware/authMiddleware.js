/*
==================================================
AUTH MIDDLEWARE
==================================================
*/

exports.isHRLoggedIn = (req, res, next) => {

    if (!req.session.user) {

        return res.redirect("/hr/login");

    }

    next();

};
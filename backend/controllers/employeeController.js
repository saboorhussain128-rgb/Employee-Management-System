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

        /* ==========================================
           VALIDATION
        ========================================== */

        if (

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

        /* ==========================================
           EMAIL CHECK
        ========================================== */

        const emailExists = await Employee.findOne({

            email

        });

        if (emailExists) {

            return res.render(

                "employees/createEmployee",

                {

                    title: "Create Employee",

                    user: req.session.user,

                    error: "Employee email already exists."

                }

            );

        }

        /* ==========================================
           AUTO GENERATE EMPLOYEE ID
        ========================================== */

        const totalEmployees = await Employee.countDocuments();

        const employeeId =

            "EMP" +

            String(totalEmployees + 1).padStart(4, "0");

        /* ==========================================
           SAVE EMPLOYEE
        ========================================== */

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

        const employees = await Employee.find().sort({

            createdAt: -1

        });

        const stats = {

            totalEmployees: await Employee.countDocuments(),

            activeEmployees: await Employee.countDocuments({

                status: "Active"

            }),

            inactiveEmployees: await Employee.countDocuments({

                status: "Inactive"

            }),

            newEmployees: await Employee.countDocuments({

                createdAt: {

                    $gte: new Date(

                        new Date().setHours(0,0,0,0)

                    )

                }

            })

        };

        res.render(

            "employees/viewEmployees",

            {

                title: "Employees",

                user: req.session.user,

                employees,

                stats

            }

        );

    }

    catch(error){

        console.log(error);

        res.redirect("/hr/dashboard");

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

        const employee = await Employee.findById(req.params.id);

        if (!employee) {

            return res.redirect("/hr/employees");

        }

        const {

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

        // Required Validation

        if (

            !name ||
            !email ||
            !phone ||
            !department ||
            !designation ||
            !joiningDate

        ) {

            return res.render(

                "employees/editEmployee",

                {

                    title: "Edit Employee",

                    user: req.session.user,

                    employee,

                    error: "Please fill all required fields."

                }

            );

        }

        // Duplicate Email Check

        const emailExists = await Employee.findOne({

            email,

            _id: { $ne: employee._id }

        });

        if (emailExists) {

            return res.render(

                "employees/editEmployee",

                {

                    title: "Edit Employee",

                    user: req.session.user,

                    employee,

                    error: "Email already exists."

                }

            );

        }

        employee.name = name;
        employee.email = email;
        employee.phone = phone;
        employee.gender = gender;
        employee.department = department;
        employee.designation = designation;
        employee.joiningDate = joiningDate;
        employee.salary = salary;
        employee.address = address;
        employee.emergencyContact = emergencyContact;
        employee.bloodGroup = bloodGroup;
        employee.status = status;

        await employee.save();

        res.redirect("/hr/employees");

    }

    catch (error) {

        console.log(error);

        res.redirect("/hr/employees");

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
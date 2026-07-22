/*
==================================================
EMPLOYEE MODULE JAVASCRIPT
Employee Management System
==================================================
*/

function openDeleteModal(employeeId, employeeName) {

    document.getElementById("deleteEmployeeName").innerText = employeeName;

    document.getElementById("confirmDeleteBtn").href =
        "/hr/employees/delete/" + employeeId;

    document.getElementById("deleteModal").style.display = "flex";

}

function closeDeleteModal() {

    document.getElementById("deleteModal").style.display = "none";

}
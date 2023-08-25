// Controllers/employeeController.js

const db = require("../models/db.js");
const Employees = db.Employees;
const Appointment = db.Appointments;
const EmployeesSchedule = db.EmployeesSchedule;

// Create and Save a new Employee
exports.create = async (req, res) => {
    if (!req.body.first_name || !req.body.last_name || !req.body.phone_number || !req.body.email) {
    res.status(400).send({ message: "Please fill all required fields" });
    return;
    }

    const employee = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    email: req.body.email,
    };

    try {
        const data = await Employees.create(employee);
        res.send(data);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Retrieve all Employees from the database.
exports.findAll = async (req, res) => {
    try {
        const data = await Employees.findAll({
            include: [
                { model: Appointment },
                { model: EmployeesSchedule},
            ]
        });
        res.send(data);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Find a single Employee with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        let data = await Employees.findByPk(id, {
            include: [
                { model: Appointment },
                { model: EmployeesSchedule},
            ]
        });
        res.send(data);
    } catch (err) {
        res.status(500).send({ message: "Error retrieving Employee with id=" + id });
    }
};

// Update an Employee by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        const num = await Employees.update(req.body, { where: { employee_id: id }});
        if (num == 1) {
        res.send({ message: "Employee was updated successfully!" });
        } else {
        res.send({ message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!` });
        }
    } catch (err) {
        res.status(500).send({ message: "Error updating Employee with id=" + id });
    }
};

// Delete an Employee with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const num = await Employees.destroy({ where: { employee_id: id }});
        if (num == 1) {
        res.send({ message: "Employee was deleted successfully!" });
        } else {
        res.send({ message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!` });
        }
    } catch (err) {
        res.status(500).send({ message: "Could not delete Employee with id=" + id });
    }
};

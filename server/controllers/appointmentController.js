// controllers/appointmentController.js
const db = require("../models/db.js");
const clientController = require("./clientController.js");
const Appointment = db.Appointments;
const Client = db.Clients;
const Employee = db.Employees;

// Create and Save a new Appointment
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.client || !req.body.employee_id || !req.body.start_time || !req.body.end_time_expected) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    try {
        // Create a new client
        const client = await clientController.createfromData(req.body.client);
        // Create an Appointment
        const appointment = {
            date_created: req.date_created || new Date(),
            client_id: client.client_id,
            employee_id: req.body.employee_id,
            start_time: req.body.start_time,
            end_time_expected: req.body.end_time_expected,
            canceled: req.body.canceled || false,
            cancellation_reason: req.body.cancellation_reason || null
        };

        // Save Appointment in the database
        let data = await Appointment.create(appointment);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred."
        });
    }
};

// Retrieve all Appointment from the database.
exports.findAll = async (req, res) => {
    try {
        let data = await Appointment.findAll({
            include: [
                { model: Client },
                { model: Employee },
            ]
        });
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving appointments."
        });
    }
};


// Find a single Appointment with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    try {
        let data = await Appointment.findByPk(id, {
            include: [
                { model: Client},
                { model: Employee },
            ]
        });
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Appointment with id=" + id
        });
    }
};

// Update an Appointment by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;

    try {
        let num = await Appointment.update(req.body, {
            where: { appointment_id: id }
        });

        if (num == 1) {
            res.send({
                message: "Appointment was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Appointment with id=${id}. Maybe Appointment was not found or req.body is empty!`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Error updating Appointment with id=" + id
        });
    }
};

// Delete an Appointment with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        let num = await Appointment.destroy({
            where: { appointment_id: id }
        });

        if (num == 1) {
            res.send({
                message: "Appointment was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Appointment with id=${id}. Maybe Appointment was not found!`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Could not delete Appointment with id=" + id
        });
    }
};

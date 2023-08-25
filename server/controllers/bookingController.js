const db = require("../models/db.js");
const ServicesBooked = db.ServicesBooked;

// Create and Save a new ServicesBooked
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.appointment_id || !req.body.service_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Save ServicesBooked in the database
  try {
    const data = await ServicesBooked.create(req.body)
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the ServicesBooked."
    });
  }
};

// Retrieve all ServicesBooked from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await ServicesBooked.findAll()
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving services booked."
    });
  }
};

// Find a single ServicesBooked with an appointment_id and service_id
exports.findOne = async (req, res) => {
  const { appointment_id, service_id } = req.params;
  try {
    const data = await ServicesBooked.findOne({ where: { appointment_id, service_id } })
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find ServicesBooked with appointment_id=${appointment_id} and service_id=${service_id}`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving ServicesBooked with appointment_id=" + appointment_id + " and service_id=" + service_id
    });
  }
};

// Update a ServicesBooked by the appointment_id and service_id in the request
exports.update = async (req, res) => {
  const { appointment_id, service_id } = req.params;
  try {
    const num = await ServicesBooked.update(req.body, { where: { appointment_id, service_id } });
    if (num == 1) {
      res.send({
        message: "ServicesBooked was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update ServicesBooked with appointment_id=${appointment_id} and service_id=${service_id}. Maybe ServicesBooked was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating ServicesBooked with appointment_id=" + appointment_id + " and service_id=" + service_id
    });
  }
};

// Delete a ServicesBooked with the specified appointment_id and service_id in the request
exports.delete = async (req, res) => {
  const { appointment_id, service_id } = req.params;
  try {
    const num = await ServicesBooked.destroy({ where: { appointment_id, service_id } });
    if (num == 1) {
      res.send({
        message: "ServicesBooked was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete ServicesBooked with appointment_id=${appointment_id} and service_id=${service_id}. Maybe ServicesBooked was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete ServicesBooked with appointment_id=" + appointment_id + " and service_id=" + service_id
    });
  }
};

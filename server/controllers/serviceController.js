const db = require("../models/db.js");
const Service = db.Services;

// Create and Save a new Service
exports.create = async (req, res) => {
  try {
    // Create a Service
    const service = {
      service_name: req.body.service_name,
      service_description: req.body.service_description,
      service_price: req.body.service_price,
      service_duration: req.body.service_duration,
      category_id: req.body.category_id
    };

    // Save Service in the database
    const data = await Service.create(service)
    res.send(data);

  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Service."
    });
  }
};

// Retrieve all Services from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await Service.findAll()
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving services."
    });
  }
};

// Find a single Service with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Service.findByPk(id)
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Service with id=" + id
    });
  }
};

// Update a Service by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Service.update(req.body, {
      where: { service_id: id }
    });

    if (num == 1) {
      res.send({
        message: "Service was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Service with id=${id}. Maybe Service was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Service with id=" + id
    });
  }
};

// Delete a Service with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Service.destroy({
      where: { service_id: id }
    });

    if (num == 1) {
      res.send({
        message: "Service was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Service with id=${id}. Maybe Service was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Service with id=" + id
    });
  }
};

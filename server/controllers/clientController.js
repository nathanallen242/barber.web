const db = require("../models/db.js");
const Client = db.Clients;

// Create and Save a new Client
exports.create = async (req, res) => {
  if (!req.body.client_email) {
    res.status(400).send({ message: "Email can not be empty!" });
    return;
  }

  const client = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    client_email: req.body.client_email,
  };

  try {
    const data = await Client.create(client);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Client.",
    });
  }
};

// Create and Save a new Client

exports.createfromData = async (clientData) => {
  if (!clientData.client_email) {
    throw new Error("Email cannot be empty!");
  }

  const client = {
    first_name: clientData.client_first_name,
    last_name: clientData.client_last_name,
    client_email: clientData.client_email,
    phone_number: clientData.client_phone_number
  };

  return await Client.create(client);
};

// Retrieve all Clients from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await Client.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving clients.",
    });
  }
};

// Find a single Client with an id and include Appointments
exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
      const data = await Client.findByPk(id);
      res.send(data);
    } catch (err) {
      res.status(500).send({ message: "Error retrieving Client with id=" + id });
    }
  };

// Update a Client by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Client.update(req.body, { where: { client_id: id } });
    if (num == 1) {
      res.send({ message: "Client was updated successfully." });
    } else {
      res.send({
        message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({ message: "Error updating Client with id=" + id });
  }
};

// Delete a Client with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Client.destroy({ where: { client_id: id } });
    if (num == 1) {
      res.send({ message: "Client was deleted successfully!" });
    } else {
      res.send({
        message: `Cannot delete Client with id=${id}. Maybe Client was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({ message: "Could not delete Client with id=" + id });
  }
};

// controllers/admin.controller.js

const db = require("../models/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require('express-async-handler');
require("dotenv").config();
const Admin = db.Admin;
const JWT_SECRET = process.env.JWT_SECRET;

// Create and Save a new Admin
exports.create = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  // Validate request
  if (!email || !password || !username) {
    return res.status(400).send({
      message: "Please enter all fields!"
    });
  }

  // Check if Admin already exists
  const adminExists = await Admin.findOne({ where: { email: email } });
  if (adminExists) {
    return res.status(400).send({
      message: "Admin already exists!"
    });
  }

  // Create a Admin
  const admin = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8), // Hash the password
  };

  // Save Admin in the database
  try {
    let data = await Admin.create(admin);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Admin."
    });
  }
});

// Retrieve all Admins from the database.
exports.findAll = asyncHandler(async (req, res) => {
  try {
    let data = await Admin.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving admins."
    });
  }
});

// Find a single Admin with an id
exports.findOne = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    let data = await Admin.findByPk(id);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Admin with id = " + id
    });
  }
});

// Update a Admin by the id in the request
exports.update = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    let num = await Admin.update(req.body, {
      where: { admin_id: id }
    });

    if (num == 1) {
      res.send({
        message: "Admin was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Admin with id=${id}. Maybe Admin was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Admin with id=" + id,
      error: err.message
    });
  }
});

// Delete a Admin with the specified id in the request
exports.delete = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    let num = await Admin.destroy({
      where: { admin_id: id }
    });

    if (num == 1) {
      res.send({
        message: "Admin was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Admin with id=${id}. Maybe Admin was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Admin with id=" + id
    });
  }
});

// Login to Admin dashboard
exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Find the admin by username
  const admin = await Admin.findOne({ where: { username } });

  if (!admin) {
    return res.status(400).json({ message: "Admin not found" });
  }

  // Compare password
  const passwordIsValid = bcrypt.compareSync(password, admin.password);
  if (!passwordIsValid) {
    return res.status(401).json({ auth: false, accessToken: null, reason: "Invalid Password!" });
  }

  // Create a token
  const token = jwt.sign({ id: admin.id, username: admin.username, role: 'admin' }, JWT_SECRET, {
    expiresIn: "30d", // 30 days
  });

  res.status(200).send({ auth: true, accessToken: token, user: { username: admin.username, role: 'admin' }});
});

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Verify Token and Retrieve Admin Information
exports.verifyToken = asyncHandler(async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).send({ auth: false, message: "Failed to authenticate token." });
  }

  // Retrieve the user information using the decoded ID
  try {
    const admin = await Admin.findByPk(decoded.id);
    if (!admin) {
      return res.status(404).send({ message: "Admin not found" });
    }

    res.status(200).send({ auth: true, user: { username: admin.username, role: 'admin' } });
  } catch (err) {
    res.status(500).send({ message: "Error retrieving Admin with id = " + decoded.id });
  }
});

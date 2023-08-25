// Routes/employeesScheduleRoutes.js

const employeesSchedule = require("../controllers/scheduleController.js");
const { protect } = require("../middleware/authMiddleware.js");
const express = require("express");
const router = express.Router();

// Create a new EmployeesSchedule / Retrieve all EmployeesSchedule
router.route("/").get(protect, employeesSchedule.findAll);

// Retrieve/Update/Delete a single EmployeesSchedule with id
router.route("/:id").get(employeesSchedule.findOne)

module.exports = router;

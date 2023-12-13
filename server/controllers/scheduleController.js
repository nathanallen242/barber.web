// Controllers/employeesScheduleController.js

const db = require("../models/db.js");
const EmployeesSchedule = db.EmployeesSchedule
const Employees = db.Employees

// Create and Save a new EmployeesSchedule
exports.create = async (req, res) => {
  try {
    const employeesSchedule = await EmployeesSchedule.create(req.body);
    res.send(employeesSchedule);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Retrieve all EmployeesSchedules from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await EmployeesSchedule.findAll({ 
      include: [
        {
          model: Employees
        }
    ] });
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Find a single EmployeesSchedule with an id
exports.findOne = async (req, res) => {
  const employee_id = req.params.id;
  
  try {
    const schedules = await EmployeesSchedule.findAll({
      where: {
        employee_id: employee_id
      },
      include: [{ model: Employees }]
    });

    if (!schedules || schedules.length === 0) {
      return res.status(404).send({ message: "No schedule found for employee_id=" + employee_id });
    }

    res.send(schedules);

  } catch (err) {
    res.status(500).send({ message: "Error retrieving EmployeesSchedule with employee_id=" + employee_id });
  }
};

// Function to fetch weekly availability of a barber
exports.getWeeklyAvailability = async (req, res) => {
  const employee_id = req.params.id;

  try {
    const schedules = await EmployeesSchedule.findAll({
      where: { employee_id: employee_id },
      attributes: ['day_id'], // fetch only day_id
    });

    if (!schedules || schedules.length === 0) {
      return res.status(404).send({ message: "No schedule found for employee_id=" + employee_id });
    }

    // Extracting day_ids and removing duplicates if any
    const availability = [...new Set(schedules.map(schedule => schedule.day_id))];
    
    res.send(availability);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving weekly availability for employee_id=" + employee_id });
  }
};



// Update an EmployeesSchedule by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await EmployeesSchedule.update(req.body, { where: { id: id }});
    if (num == 1) {
      res.send({ message: "EmployeesSchedule was updated successfully." });
    } else {
      res.send({ message: `Cannot update EmployeesSchedule with id=${id}. Maybe EmployeesSchedule was not found or req.body is empty!` });
    }
  } catch (err) {
    res.status(500).send({ message: "Error updating EmployeesSchedule with id=" + id });
  }
};

// Delete an EmployeesSchedule with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await EmployeesSchedule.destroy({ where: { id: id }});
    if (num == 1) {
      res.send({ message: "EmployeesSchedule was deleted successfully!" });
    } else {
      res.send({ message: `Cannot delete EmployeesSchedule with id=${id}. Maybe EmployeesSchedule was not found!` });
    }
  } catch (err) {
    res.status(500).send({ message: "Could not delete EmployeesSchedule with id=" + id });
  }
};

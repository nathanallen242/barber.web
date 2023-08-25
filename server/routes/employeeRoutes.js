const employees = require('../controllers/employeeController.js')
const express = require("express");
const router = express.Router();

router.route('/').get(employees.findAll);

module.exports = router;
const appointmentController = require('../controllers/appointmentController.js');
const router = require('express').Router();

// Create a new appointment
router.post('/', appointmentController.create);


module.exports = router;
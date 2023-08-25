const admins = require('../controllers/adminController.js');
const appointments = require('../controllers/appointmentController.js');
const bookings = require('../controllers/bookingController.js');
const clients = require('../controllers/clientController.js');
const services = require('../controllers/serviceController.js');
const employees = require("../controllers/employeeController.js");
const schedules = require('../controllers/scheduleController.js')
const {protect} = require('../middleware/authMiddleware.js');
const router = require('express').Router();

// Admin Management Routes
router.route('/register').post(protect, admins.create);
router.route('/login').post(admins.login);
router.route('/verify').get(admins.verifyToken);
router.route('/').get(protect, admins.findAll);

// Service Management Routes
router.route("/services").post(protect, services.create).get(protect, services.findAll);
router.route("/services/:id").get(protect, services.findOne).put(protect, services.update).delete(protect, services.delete);

// Appointment Management Routes
router.route('/appointments').get(protect, appointments.findAll);
router.route('/appointments/:id').get(protect, appointments.findOne).put(protect, appointments.update).delete(protect, appointments.delete);

// Booking Management Routes
router.route("/bookings").post(bookings.create).get(protect, bookings.findAll);
router.route("/bookings/:appointment_id/:service_id").get(protect, bookings.findOne).put(protect, bookings.update).delete(protect, bookings.delete);

// Client Management Routes
router.route('/clients').get(protect, clients.findAll);
router.route('/clients/:id').get(protect, clients.findOne).put(protect, clients.update).delete(protect, clients.delete);

// Employee Management Routes
router.route("/employees").post(protect, employees.create);
router.route("/employees/:id").get(protect, employees.findOne).put(protect, employees.update).delete(protect, employees.delete);

// Schedule Management Routes
router.route('/schedules').post(protect, schedules.create);
router.route('/schedules/:id').put(protect, schedules.update).delete(protect, schedules.delete);

// This should be one of the LAST routes
// Retrieve/Update/Delete a single Admin with id
router.route('/:id').get(protect, admins.findOne).put(protect, admins.update).delete(protect, admins.delete);

module.exports = router;

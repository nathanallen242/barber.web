const services = require('../controllers/serviceController.js');
const {protect} = require('../middleware/authMiddleware.js');
const router = require('express').Router();

// Create a new Service / Retrieve all Services
router.route("/").get(services.findAll);

  
module.exports = router;
  
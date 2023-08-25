const categories = require('../controllers/categoryController.js');
const router = require('express').Router();

// Retrieve all ServiceCategories
router.get("/", categories.findAll);

module.exports = router;
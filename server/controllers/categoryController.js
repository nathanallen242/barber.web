const db = require("../models/db.js");
const ServiceCategories = db.ServiceCategories;

// Retrieve all ServiceCategories from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await ServiceCategories.findAll()
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving service categories."
    });
  }
};

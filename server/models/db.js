// db.js
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config.js')
const basename = path.basename(__filename);
const db = {};

// Initialize a new Sequelize instance
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect,

  pool: {
    max: config.development.pool.max,
    min: config.development.pool.min,
    acquire: config.development.pool.acquire,
    idle: config.development.pool.idle
  }
});

// Confirm connection to database
sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(error => console.error('Unable to connect to the database:', error));

// Import all the models
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Associate all the models
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// // Export all db objects
// db.Admin = require("./Admin.js")(sequelize, Sequelize);
// db.client = require("./Client.js")(sequelize, Sequelize);
// db.appointment = require("./Appointment.js")(sequelize, Sequelize);
// db.employee = require("./Employee.js")(sequelize, Sequelize);
// db.EmployeesSchedule = require("./employeeSchedule.js")(sequelize, Sequelize);
// db.Services = require("./Service.js")(sequelize, Sequelize);
// db.ServiceCategories = require("./serviceCategories.js")(sequelize, Sequelize);
// db.ServicesBooked = require("./servicesBooked.js")(sequelize, Sequelize);

module.exports = db;

// config.js
require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  },
  // other environments can go here (e.g., production, staging, test, etc.)
};

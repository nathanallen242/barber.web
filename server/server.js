const express = require("express");
const cors = require("cors");
const db = require("./models/db.js");
const adminRoutes = require("./routes/adminRoutes.js");
const appointmentRoutes = require("./routes/appointmentRoutes.js");
const scheduleRoutes = require("./routes/scheduleRoutes.js")
const serviceRoutes = require("./routes/serviceRoutes.js")
const categoryRoutes = require("./routes/categoryRoutes.js")
const employeeRoutes = require("./routes/employeeRoutes.js")
const authRoutes = require("./routes/authRoutes.js")
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();

const port = process.env.PORT || 8080;

const app = express();

var corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
};

app.use(cors(corsOptions));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new SequelizeStore({
      db: db.sequelize
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
 },
}));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync({ force: false, alter: true }).then(() => {
  console.log("Database synced successfully after reboot.");
});


// API routes
app.use("/api/auth", authRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/employees", employeeRoutes);



app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
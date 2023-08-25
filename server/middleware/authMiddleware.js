const jwt = require('jsonwebtoken');
const db = require("../models/db.js");
const asyncHandler = require('express-async-handler');
const Admin = db.Admin;
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const extractToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Token verification failed');
  }
};

const protect = asyncHandler(async (req, res, next) => {
  let token = extractToken(req);

  // If in test environment and mock token provided, set dummy user
  if (process.env.NODE_ENV === "test" && token === "MOCK_TOKEN") {
    req.user = { id: "test_user_id" }; // Adjust to match your expected user object structure
    return next();
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = await Admin.findByPk(decoded.id);
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
});

module.exports = { protect };

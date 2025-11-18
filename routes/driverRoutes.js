const express = require("express");
const router = express.Router();
const { addDriver, getDrivers, getDriverById } = require("../controllers/driverController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// ADMIN – Add driver
router.post("/", verifyToken, isAdmin, addDriver);

// PUBLIC – Get all drivers
router.get("/", getDrivers);

// PUBLIC – Get driver by ID
router.get("/:id", getDriverById);

module.exports = router;

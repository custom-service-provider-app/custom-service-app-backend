const express = require("express");
const { customerRegister, customerLogin } = require("../controllers/customerAuthController");

const router = express.Router();
router.post("/register", customerRegister);
router.post("/login", customerLogin);

module.exports = router;

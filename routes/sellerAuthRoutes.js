const express = require("express");
const { sellerRegister, sellerLogin } = require("../controllers/sellerAuthController");

const router = express.Router();
router.post("/register", sellerRegister);
router.post("/login", sellerLogin);

module.exports = router;

const express = require("express");
const { filterSearch } = require("../controllers/filterSearchController");
const router = express.Router();

router.get("/", filterSearch);

module.exports = router;

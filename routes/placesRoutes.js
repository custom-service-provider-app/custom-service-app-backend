const express = require("express");
const router = express.Router();
const { autocomplete, placeDetails } = require("../controllers/placesController");

router.get("/autocomplete", autocomplete);
router.get("/details", placeDetails);

module.exports = router;

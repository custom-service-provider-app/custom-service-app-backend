const express = require('express');
const { reverseGeocode } = require('../controllers/mapController');

const router = express.Router();

router.post('/reverse-geocode', reverseGeocode);

module.exports = router;

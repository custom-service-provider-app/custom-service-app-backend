const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const reverseGeocode = async (req, res) => {
  const { lat, lng } = req.body;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and longitude are required.' });
  }

  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );

    if (response.data.status === 'OK') {
      const address = response.data.results[0]?.formatted_address || 'Address not found';
      res.json({ address });
    } else {
      res.status(400).json({ error: 'Geocoding failed', details: response.data.status });
    }
  } catch (error) {
    console.error('Error calling Google Maps API:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { reverseGeocode };

const axios = require("axios");

exports.autocomplete = async (req, res) => {
  try {
    const input = req.query.input;
    console.log("📍 Autocomplete called with input:", input); // <--- add this
    if (!input || input.length < 3) {
      return res.status(400).json({ message: "Input too short" });
    }

    const googleRes = await axios.get(
      "https://maps.googleapis.com/maps/api/place/autocomplete/json",
      {
        params: {
          input,
          key: process.env.GOOGLE_MAPS_API_KEY,
          components: "country:in",
        },
      }
    );

    console.log("✅ Google API response:", googleRes.data); // <-- Add this

    return res.json(googleRes.data);
  } catch (err) {
    console.error("Google Places Autocomplete error:", err);
    return res.status(500).json({ error: "Failed to fetch autocomplete" });
  }
};

exports.placeDetails = async (req, res) => {
  try {
    const placeId = req.query.place_id;
    if (!placeId) return res.status(400).json({ message: "Missing place_id" });

    const googleRes = await axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: {
          place_id: placeId,
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      }
    );

    return res.json(googleRes.data);
  } catch (err) {
    console.error("Google Places Details error:", err);
    return res.status(500).json({ error: "Failed to fetch place details" });
  }
};

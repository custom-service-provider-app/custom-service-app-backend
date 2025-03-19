const express = require("express");
const { getListings, createListing, approveListing, getListingsByCategory } = require("../controllers/listingController");
const { verifyAdmin, verifyToken, isSeller } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getListings);
router.post("/", verifyToken, isSeller, createListing);
router.get("/filter", getListingsByCategory);

// router.put("/:id/approve", verifyAdmin, approveListing);

module.exports = router;

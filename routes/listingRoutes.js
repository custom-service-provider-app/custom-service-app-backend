const express = require("express");
const { getListings, createListing, approveListing } = require("../controllers/listingController");
const { verifyAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getListings);
router.post("/", createListing);
router.put("/:id/approve", verifyAdmin, approveListing);

module.exports = router;

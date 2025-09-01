const express = require("express");
const { createSubCategory, getSubCategories, deleteSubCategory } = require("../controllers/subcategoryController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// router.post("/", verifyToken, isAdmin, createSubCategory);  // Only ADMIN can create
router.post("/", createSubCategory);  
router.get("/", getSubCategories);                          // Anyone can fetch
router.delete("/:id", verifyToken, isAdmin, deleteSubCategory); // Only ADMIN can delete

module.exports = router;

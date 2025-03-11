const express = require("express");
const { createCategory, getCategories, deleteCategory } = require("../controllers/categoryController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, isAdmin, createCategory);  // Only ADMIN can create
router.get("/", getCategories);                          // Anyone can fetch
router.delete("/:id", verifyToken, isAdmin, deleteCategory); // Only ADMIN can delete

module.exports = router;



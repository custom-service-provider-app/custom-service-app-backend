const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const existingCategory = await prisma.category.findUnique({ where: { name } });
    if (existingCategory) return res.status(400).json({ error: "Category already exists" });

    const category = await prisma.category.create({ data: { name } });

    res.status(201).json({ message: "Category created", category });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({ include: { subcategories: true } });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.category.delete({ where: { id } });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Cannot delete category" });
  }
};

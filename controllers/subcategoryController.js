const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.createSubCategory = async (req, res) => {
  const { name, categoryId } = req.body;

  try {
    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) return res.status(400).json({ error: "Category not found" });

    const existingSubCategory = await prisma.subCategory.findFirst({ where: { name, categoryId } });
    if (existingSubCategory) return res.status(400).json({ error: "Subcategory already exists in this category" });

    const subcategory = await prisma.subCategory.create({ data: { name, categoryId } });

    res.status(201).json({ message: "Subcategory created", subcategory });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getSubCategories = async (req, res) => {
  try {
    const subcategories = await prisma.subCategory.findMany({ include: { category: true } });
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteSubCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.subCategory.delete({ where: { id } });
    res.json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Cannot delete subcategory" });
  }
};

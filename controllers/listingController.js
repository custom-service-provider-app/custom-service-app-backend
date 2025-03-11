const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getListings = async (req, res) => {
  const { location, category } = req.query;
  try {
    const listings = await prisma.listing.findMany({
      where: { location, category, status: "APPROVED" },
    });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.createListing = async (req, res) => {
  const { title, description, price, location, category, ownerId } = req.body;
  try {
    const listing = await prisma.listing.create({
      data: { title, description, price, location, category, ownerId },
    });
    res.json(listing);
  } catch (error) {
    res.status(400).json({ error: "Error creating listing" });
  }
};

exports.approveListing = async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await prisma.listing.update({ where: { id }, data: { status: "APPROVED" } });
    res.json(listing);
  } catch (error) {
    res.status(400).json({ error: "Error approving listing" });
  }
};

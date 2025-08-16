const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.searchListings = async (req, res) => {
  const q = req.query.q?.toLowerCase().trim();

  if (!q) {
    return res.status(400).json({ message: "Query is required" });
  }

  const keywords = ["rooms", "room", "to-let", "tolet", "rent", "rooms on rent", "rent rooms"];

  let listings = [];

  try {
    // 1. exact subcategory match
    const matchedSub = await prisma.subCategory.findFirst({
        where: { name: { contains: q, mode: "insensitive" } }
    });

    if (matchedSub) {
      listings = await prisma.listing.findMany({
        where: {
          subCategoryId: matchedSub.id,
          status: "APPROVED"
        },
        include: { owner: { select: { name: true } } }
      });
    } else if (keywords.includes(q)) {
      // 2. keyword match -> all approved
      listings = await prisma.listing.findMany({
        where: { status: "APPROVED" },
        include: { owner: { select: { name: true } } }
      });
    }

    if (listings.length === 0) {
      return res.status(200).json({ message: "No results" });
    } else {
      return res.json({ listings });
    }

  } catch (err) {
    console.error("Error in search:", err);
    res.status(500).json({ error: "Server error in search" });
  }
};

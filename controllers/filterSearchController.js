// controllers/searchController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.filterSearch = async (req, res) => {
  const subCategoryId = req.query.subcategory || null;
  const pincode = req.query.pincode || null;

  // numbers with sane defaults
  let priceFrom = Number.isFinite(parseInt(req.query.priceFrom)) ? parseInt(req.query.priceFrom) : 0;
  let priceTo   = Number.isFinite(parseInt(req.query.priceTo))   ? parseInt(req.query.priceTo)   : 999999;

  if (priceFrom < 0) priceFrom = 0;
  if (priceTo < priceFrom) [priceFrom, priceTo] = [priceTo, priceFrom];

  const strictPriceFilter = {
    priceFrom: { gte: priceFrom },
    priceTo:   { lte: priceTo }
  };

  try {
    if (!subCategoryId) {
      return res.status(400).json({ error: "Subcategory is required" });
    }

    let where = {
      status: "APPROVED",
      subCategoryId,
      ...strictPriceFilter
    };

    if (pincode) {
      where.pincode = pincode; // ✅ exact match filter
    }

    const listings = await prisma.listing.findMany({
      where,
      include: { owner: { select: { name: true } } },
    });

    if (!listings.length) {
      return res.status(200).json({ message: "No results" });
    }

    return res.json({ listings });
  } catch (err) {
    console.error("Error in search:", err);
    res.status(500).json({ error: "Server error in search" });
  }
};

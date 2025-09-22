// controllers/searchController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.searchListings = async (req, res) => {
  const q = typeof req.query.q === "string" ? req.query.q.trim() : "";

  const subCategoryId = req.query.subcategory || null;

  // numbers with sane defaults
  let priceFrom = Number.isFinite(parseInt(req.query.priceFrom)) ? parseInt(req.query.priceFrom) : 0;
  let priceTo   = Number.isFinite(parseInt(req.query.priceTo))   ? parseInt(req.query.priceTo)   : 999999;

  // guard rails
  if (priceFrom < 0) priceFrom = 0;
  if (priceTo < priceFrom) [priceFrom, priceTo] = [priceTo, priceFrom];

  const strictPriceFilter = {
    priceFrom: { gte: priceFrom },
    priceTo:   { lte: priceTo }
  };

  try {
    let where = { status: "APPROVED", ...strictPriceFilter };

    if (subCategoryId) {
      // ✅ Only this subcategory
      where.subCategoryId = subCategoryId;
    }

    if (q) {
      // ✅ Text search across multiple fields
      where = {
        ...where,
        OR: [
          { title:       { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
          { state:       { contains: q, mode: "insensitive" } },
          { city:        { contains: q, mode: "insensitive" } },
          { area:        { contains: q, mode: "insensitive" } },
        ],
      };
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

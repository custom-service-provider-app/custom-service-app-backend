const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.createListing = async (req, res) => {
  const {
    title,
    description,
    priceFrom,
    priceTo,
    location,
    latitude,
    longitude,
    state,
    city,    
    area,
    categoryId,
    subCategoryId
  } = req.body;

  const sellerId = req.user.userId;

  try {
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        priceFrom: parseFloat(priceFrom),
        priceTo: parseFloat(priceTo),
        location,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        state,
        city,        
        area,
        categoryId,
        subCategoryId,
        ownerId: sellerId,
        status: "PENDING",
      },
    });

    res.status(201).json({
      message: "Listing created successfully, pending approval.",
      listing,
    });
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({
      error: "Server error while adding listing.",
      details: error.message,
    });
  }
};

// exports.getListings = async (req, res) => {
//   try {
//     const { subcategory } = req.query;

//     const filter = { status: "APPROVED" };

//     if (subcategory) {
//       filter.subCategoryId = subcategory; // match your DB column name exactly
//     }

//     const listings = await prisma.listing.findMany({
//       where: filter,
//       include: { owner: { select: { name: true, email: true } } },
//     });

//     if (listings.length === 0) {
//       return res.status(200).json({ message: "No listings found for your search.", listings: [] });
//     }

//     res.json({ listings });
//   } catch (error) {
//     console.error("Error fetching listings:", error);
//     res.status(500).json({ error: "Server error while fetching listings." });
//   }
// };

exports.getListings = async (req, res) => {
  try {
    const { subcategory, pincode } = req.query;

    console.log("📩 Received query:", req.query);

    const filter = { status: "APPROVED" };
    if (subcategory) filter.subCategoryId = subcategory;
    if (pincode) filter.pincode = pincode;

    console.log("🔍 Prisma filter:", filter);

    const listings = await prisma.listing.findMany({
      where: filter,
      include: { owner: { select: { name: true, email: true } } },
    });

    console.log("✅ Listings found:", listings.length);

    if (listings.length === 0) {      
      return res.status(200).json({ message: "No listings found for your search.", listings: [] });
    }

    res.json({ listings });
  } catch (error) {
    console.error("❌ Error fetching listings:", err);
    res.status(500).json({ error: "Server error while fetching listings." });
  }
};

exports.getListingsByCategory = async (req, res) => {
  try {
    const { categoryId, subCategoryId } = req.query; // Get filter params from query

    const filter = {
      status: "APPROVED", // Only fetch approved listings
      categoryId,
    };

    if (subCategoryId) {
      filter.subCategoryId = subCategoryId; // Apply subcategory filter if provided
    }

    console.log("Filter being applied:", filter);


    const listings = await prisma.listing.findMany({
      where: filter,
      include: {
        category: true,
        subcategory: true,
        owner: { select: { id: true, name: true, email: true } }, // Include owner details
      },
    });

    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ error: "Server error while fetching listings." });
  }
};
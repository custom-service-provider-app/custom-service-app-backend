const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.createListing = async (req, res) => {
  const { title, description, price, location, categoryId, subCategoryId } = req.body;
  const sellerId = req.user.userId; // Extract from authenticated user

  try {
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        location,
        categoryId,
        subCategoryId, // ✅ Correct field name (with capital "C")
        ownerId: sellerId, // ✅ Assign logged-in seller
        status: "PENDING", // ✅ Default status
      },
    });

    res.status(201).json({ message: "Listing created successfully, pending approval.", listing });
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ error: "Server error while adding listing.", details: error.message });
  }
};

exports.getListings = async (req, res) => {
  try {
    const listings = await prisma.listing.findMany({
      where: { status: "APPROVED" }, // Only fetch approved listings
      include: { owner: { select: { name: true, email: true } } }, // Include seller details
    });

    res.json(listings);
  } catch (error) {
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


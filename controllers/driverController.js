const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ADD DRIVER (ADMIN ONLY)
// exports.addDriver = async (req, res) => {
//   try {
//     const { name, phone, licenseNo, vehicleNo } = req.body;

//     // only admins
//     if (req.user.role !== "ADMIN") {
//       return res.status(403).json({ message: "Access denied. Admin only." });
//     }

//     const driver = await prisma.driver.create({
//       data: { name, phone, licenseNo, vehicleNo },
//     });

//     res.status(201).json({ message: "Driver added successfully", driver });
//   } catch (error) {
//     console.error("Add driver error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

exports.addDriver = async (req, res) => {
  try {
    const {
      name,
      phone,
      licenseNo,
      vehicleNo,
      isAvailable,
      drivingAreas,
      drivingExperience,
      driverPhoto,
      dateOfBirth,
      drivingLicenceDocument,
      aadhaarCardDocument,
    } = req.body;

    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const driver = await prisma.driver.create({
      data: {
        name,
        phone,
        licenseNo,
        vehicleNo,
        isAvailable: isAvailable ?? true,
        drivingAreas: drivingAreas ?? [],
        drivingExperience,
        driverPhoto,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        drivingLicenceDocument,
        aadhaarCardDocument,
      },
    });

    res.status(201).json({ message: "Driver added successfully", driver });
  } catch (error) {
    console.error("Add driver error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUBLIC – GET ALL DRIVERS
// exports.getDrivers = async (req, res) => {
//   try {
//     const drivers = await prisma.driver.findMany({
//       orderBy: { createdAt: "desc" },
//     });

//     res.json(drivers);
//   } catch (error) {
//     console.error("Fetch drivers error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

exports.getDrivers = async (req, res) => {
  try {
    const drivers = await prisma.driver.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(drivers);
  } catch (error) {
    console.error("Fetch drivers error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUBLIC – GET SINGLE DRIVER
// exports.getDriverById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const driver = await prisma.driver.findUnique({ where: { id } });

//     if (!driver) {
//       return res.status(404).json({ message: "Driver not found" });
//     }

//     res.json(driver);
//   } catch (error) {
//     console.error("Fetch driver error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

exports.getDriverById = async (req, res) => {
  try {
    const driver = await prisma.driver.findUnique({
      where: { id: req.params.id },
    });

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.json(driver);
  } catch (error) {
    console.error("Fetch driver error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const express = require("express");
const cors = require("cors");
const customerAuthRoutes = require("./routes/customerAuthRoutes");
const sellerAuthRoutes = require("./routes/sellerAuthRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const listingRoutes = require("./routes/listingRoutes");
const mapRoutes = require('./routes/mapRoutes');
const searchRoutes = require("./routes/searchRoutes");
const filterSearchRoutes = require("./routes/filterSearchRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/customer", customerAuthRoutes);
app.use("/api/seller", sellerAuthRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/listings", listingRoutes);
app.use('/api/maps', mapRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/filter", filterSearchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

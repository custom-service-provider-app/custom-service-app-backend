const express = require("express");
const customerAuthRoutes = require("./routes/customerAuthRoutes");
const sellerAuthRoutes = require("./routes/sellerAuthRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");

const app = express();
app.use(express.json());

app.use("/api/customer", customerAuthRoutes);
app.use("/api/seller", sellerAuthRoutes);
app.use("/api/admin", adminAuthRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

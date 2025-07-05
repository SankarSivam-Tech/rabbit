const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/UserRoutes");
const productRoutes = require("./routes/ProductRoutes");
const cartRoutes = require("./routes/CartRoutes");
const checkoutRoutes = require("./routes/CheckoutRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const uploadRoutes = require("./routes/UploadRoutes");
const subscribeRoutes = require("./routes/SubscribeRoute");
const adminRoutes = require("./routes/AdminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const orderAdminRoutes = require("./routes/adminOrderRoutes");

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoutes);

// Admin
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes); 
app.use("/api/admin/orders", orderAdminRoutes); 

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

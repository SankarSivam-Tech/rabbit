const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/user");
const Cart = require("./models/Cart");
const products = require("./data/products");

dotenv.config();

// connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to seed data

const seedData = async () => {
  try {
    // clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // create a default admin user
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    // Assign default userId to each Product
    const userID = createdUser._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    // Insert the products into DB
    await Product.insertMany(sampleProducts);

    console.log("Product data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding the data:", error);
    process.exit(1);
  }
};

seedData();

const session = require("express-session");
const express = require("express");
require("dotenv").config();
const { connectDB } = require("./config/db");
const User = require("./models/UserModel");
const Product = require("./models/productModel");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Middleware
app.use(express.json());


app.use(session({
  secret: "my_secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

connectDB();

// Use user routes
app.use("/users", userRoutes);

// Use product routes
app.use("/products", productRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running with PostgreSQL...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import connectDB from "./config/db.js";
import { connectRedis } from "./utils/redisClient.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import payementRoutes from "./routes/paymentRoutes.js";
import addressRoute from "./routes/addressRoutes.js";
import wishlistRoutes from "./routes/wishlistRoute.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import discountRoutes from "./routes/discountRoutes.js";
import "./config/passport.js";

dotenv.config();

// Connect DBs
await connectDB();
await connectRedis();

const app = express();

// ✅ CORRECTED CORS SETUP
app.use(cors({
  origin: "http://localhost:5173",  // ✅ your frontend
  credentials: true                // ✅ allow cookies and auth headers
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions (for Passport/Google OAuth)
app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true in production with HTTPS
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
}));

// ROUTES
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", payementRoutes);
app.use("/api/address", addressRoute);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/discounts", discountRoutes);

export default app;

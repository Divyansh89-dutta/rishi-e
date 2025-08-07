import Product from "../models/Prodect.js";
import { redisClient } from "../utils/redisClient.js";
import { v2 as cloudinary } from "cloudinary";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, brand, category, stock } = req.body;

    const images = req.files?.map((file) => ({
      public_id: file.filename,
      url: file.path,
    })) || [];

    const product = await Product.create({
      title,
      description,
      price,
      brand,
      category,
      stock,
      images,
      createdBy: req.user._id,
    });

    // Invalidate cache
    await redisClient.del("product:*");

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      message: "Product creation failed",
      error: err.message,
    });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const { keyword = "", brand, category, sort } = req.query;

    const cacheKey = `product:${keyword}:${brand || ""}:${category || ""}:${sort || ""}`;
    const cached = await redisClient.get(cacheKey);

    if (cached) {
      console.log("🔁 Cache hit");
      return res.status(200).json(JSON.parse(cached));
    }

    const query = {};

    if (keyword) query.title = { $regex: keyword, $options: "i" };
    if (brand) query.brand = brand;
    if (category) query.category = category;

    console.log("🧾 Final Query:", query);

    const sortOption =
      sort === "asc" ? { price: 1 } :
      sort === "desc" ? { price: -1 } :
      { createdAt: -1 };

    const products = await Product.find(query).sort(sortOption);

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(products));
    console.log("📦 Cache miss — set new data");

    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Single Product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Fetching product failed", error: err.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { title, description, price, brand, category, stock } = req.body;
    const images = req.files?.map((file) => ({
      public_id: file.filename,
      url: file.path,
    })) || [];

    const updatedFields = { title, description, price, brand, category, stock };
    if (images.length > 0) updatedFields.images = images;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    await redisClient.del("product:*");
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    for (const img of product.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await product.deleteOne();
    await redisClient.del("product:*");
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

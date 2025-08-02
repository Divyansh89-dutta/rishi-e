import Product from "../models/Prodect.js";
import { redisClient } from "../utils/redisClient.js";
import cloudinary from "../config/cloudinary.js";

// ✅ Create Product
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

    await redisClient.del("products:*"); // ✅ Invalidate cache after create
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      message: "Product creation failed",
      error: err.message,
    });
  }
};

// ✅ Get All Products (with Redis caching + full-text search)
// ✅ GET /api/products
export const getAllProducts = async (req, res) => {
  const { keyword = "", brand, category } = req.query;

  const cacheKey = `products:${keyword}:${brand || ""}:${category || ""}`;
  const cached = await redisClient.get(cacheKey);

  if (cached) {
    console.log("✅ Redis hit");
    return res.status(200).json(JSON.parse(cached));
  }

  let query = {}; // <- Important: default empty object to fetch all

  // Add filters only if provided
  if (keyword) {
    query.title = { $regex: keyword, $options: "i" }; // Search by title
  }

  if (brand) query.brand = brand;
  if (category) query.category = category;

  const products = await Product.find(query).sort({ createdAt: -1 });

  await redisClient.setEx(cacheKey, 3600, JSON.stringify(products));
  console.log("❌ Redis miss – set new cache");

  res.status(200).json(products);
};



// ✅ Get Single Product by ID
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Fetching product failed", error: err.message });
  }
};

// ✅ Update Product
export const updateProduct = async (req, res) => {
  try {
    const { title, description, price, brand, category, stock } = req.body;

    const images = req.files?.map((file) => ({
      public_id: file.filename,
      url: file.path,
    }));

    const updatedFields = { title, description, price, brand, category, stock };
    if (images) updatedFields.images = images;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    await redisClient.del("products:*"); // ✅ Invalidate all product cache
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// ✅ Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    for (const img of product.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await product.deleteOne();
    await redisClient.del("products:*"); // ✅ Invalidate cache after delete

    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

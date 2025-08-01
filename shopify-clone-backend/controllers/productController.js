// controllers/productController.js
import Product from "../models/Prodect.js";

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
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Fetching products failed", error: err.message });
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
    }));

    const updatedFields = { title, description, price, brand, category, stock };
    if (images) updatedFields.images = images;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

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
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

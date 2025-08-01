// controllers/wishlistController.js
import Wishlist from "../models/Wishlist.js";

export const addToWishlist = async (req, res) => {
  const { productId } = req.body;

  const exists = await Wishlist.findOne({ user: req.user._id, product: productId });
  if (exists) {
    return res.status(400).json({ message: "Already in wishlist" });
  }

  const wishlistItem = await Wishlist.create({
    user: req.user._id,
    product: productId,
  });

  res.status(201).json(wishlistItem);
};

export const removeFromWishlist = async (req, res) => {
  const { productId } = req.params;

  await Wishlist.findOneAndDelete({
    user: req.user._id,
    product: productId,
  });

  res.status(200).json({ message: "Removed from wishlist" });
};

export const getWishlist = async (req, res) => {
  const wishlist = await Wishlist.find({ user: req.user._id }).populate("product");
  res.status(200).json(wishlist);
};

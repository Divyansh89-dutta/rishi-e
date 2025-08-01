import User from "../models/User.js";

export const toggleWishlist = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { productId } = req.body;

  const index = user.wishlist.indexOf(productId);

  if (index > -1) {
    // Remove
    user.wishlist.splice(index, 1);
  } else {
    // Add
    user.wishlist.push(productId);
  }

  await user.save();
  res.status(200).json({ wishlist: user.wishlist });
};

export const getWishlist = async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");
  res.status(200).json(user.wishlist);
};

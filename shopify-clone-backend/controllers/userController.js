import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.status(200).json(user);
}; 

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.avatar = req.body.avatar || user.avatar;
    user.phone = req.body.phone || user.phone;
    await user.save();
    res.status(200).json({ message: 'Profile updated' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

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

export const updateAddress = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.address = req.body.address || user.address;
    await user.save();
    res.status(200).json({ message: 'Address updated' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};
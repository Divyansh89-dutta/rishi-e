// controllers/addressController.js
import Address from "../models/Adderss.js";

// Get all addresses for the logged-in user
export const getMyAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch addresses", error: error.message });
  }
};

// Add a new address
export const addAddress = async (req, res) => {
  const { fullName, addressLine, city, postalCode, country, phone, isDefault } = req.body;

  try {
    // If isDefault is true, set all other addresses as not default
    if (isDefault) {
      await Address.updateMany({ user: req.user._id }, { isDefault: false });
    }

    const newAddress = await Address.create({
      user: req.user._id,
      fullName,
      addressLine,
      city,
      postalCode,
      country,
      phone,
      isDefault,
    });

    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ message: "Failed to add address", error: error.message });
  }
};

// Update an address by ID
export const updateAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address || address.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Address not found or unauthorized" });
    }

    // If making this address the default, unset all others
    if (req.body.isDefault) {
      await Address.updateMany({ user: req.user._id }, { isDefault: false });
    }

    Object.assign(address, req.body);
    await address.save();

    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: "Failed to update address", error: error.message });
  }
};

// Delete an address
export const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address || address.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Address not found or unauthorized" });
    }

    await address.deleteOne();
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete address", error: error.message });
  }
};
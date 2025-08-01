import express from "express";
import {
  getMyAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET /api/addresses - Get all addresses for user
// POST /api/addresses - Add new address
router
  .route("/")
  .get(protect, getMyAddresses)
  .post(protect, addAddress);

// PUT /api/addresses/:id - Update address
// DELETE /api/addresses/:id - Delete address
router
  .route("/:id")
  .put(protect, updateAddress)
  .delete(protect, deleteAddress);

export default router;

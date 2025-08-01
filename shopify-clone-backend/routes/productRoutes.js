// routes/productRoutes.js
import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uplaod.js";

const router = express.Router();

router.post("/", protect, upload.array("images", 5), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.put("/:id", protect, upload.array("images", 5), updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;

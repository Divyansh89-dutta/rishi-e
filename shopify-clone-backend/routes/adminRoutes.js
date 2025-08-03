import express from 'express';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';
import {
  getAllOrders,
  getOrderById,
  markOrderDelivered
} from '../controllers/adminController.js';

const router = express.Router();

router.use(protect, isAdmin); // All routes are admin-protected

router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id/deliver', markOrderDelivered);

export default router;

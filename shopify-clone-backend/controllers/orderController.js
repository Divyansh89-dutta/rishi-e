import Order from "../models/Order.js";
import { emitNotification } from "../utils/emitNotification.js";
import { sendOrderConfirmationEmail } from "../utils/emailSender.js";
import { applyDiscountCodeInternally, markCodeUsed } from "../utils/discountUtils.js";
import { getIO } from "../utils/socket.js";
import Product from "../models/Prodect.js";
import { sendEmail } from "../utils/sendEmail.js";

// ✅ Create Order
export const createOrder = async (req, res) => {
  let { items, shippingAddress, paymentMethod, totalAmount, discountCode } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  try {
    if (discountCode) {
      const { discountPercent, error } = await applyDiscountCodeInternally(discountCode, req.user._id);

      if (error) {
        return res.status(400).json({ message: error });
      }

      const discountAmount = (discountPercent / 100) * totalAmount;
      totalAmount -= discountAmount;

      await markCodeUsed(discountCode, req.user._id);
    }

    // 🧾 Create and save the order
    const order = new Order({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });

    const savedOrder = await order.save();

    // 📉 Update stock for each item
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    // 📧 Send order confirmation email
    await sendOrderConfirmationEmail(req.user.email, savedOrder);

    // ⏰ Send shipping email after 30 minutes
    setTimeout(async () => {
      await sendEmail({
        to: req.user.email,
        subject: "Your Order Has Been Shipped!",
        text: `Hi ${req.user.name},\n\nYour order #${savedOrder._id} has been shipped! 🚚`,
      });
    }, 1 * 60 * 1000); // 30 minutes

    const io = getIO();

    // 🔔 Real-time socket notification to user
    io.to(req.user._id.toString()).emit("orderPlaced", {
      message: "Your order has been placed successfully!",
      orderId: savedOrder._id,
    });

    // 🔔 Admin dashboard notification
    io.emit("newOrder", savedOrder);

    // 🔔 Save notification in DB
    await emitNotification({
      io,
      to: req.user._id,
      from: req.user._id,
      type: "order",
      message: "Your order has been placed successfully!",
      data: { orderId: savedOrder._id },
    });

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// ✅ Admin: Get All Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// ✅ User: Get Own Orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders" });
  }
};

// ✅ Get Order by ID (user or admin)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error: error.message });
  }
};

// ✅ Admin: Mark Delivered
export const markDeliversed = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.isDelivered = true;
    order.deliveredAt = new Date();
    await order.save();

    res.status(200).json({ message: "Order marked as delivered" });
  } catch (error) {
    res.status(500).json({ message: "Delivery update failed", error: error.message });
  }
};

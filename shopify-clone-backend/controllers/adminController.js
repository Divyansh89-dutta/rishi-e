import Order from '../models/Order.js';

export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('user', 'name email');
  res.status(200).json(orders);
};

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.status(200).json(order);
};

export const markOrderDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.isDelivered = true;
  order.deliveredAt = Date.now();
  await order.save();

  res.status(200).json({ message: 'Order marked as delivered' });
};

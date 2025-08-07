import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0)
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl">Your cart is empty</h2>
        <Link to="/" className="text-blue-600 underline mt-4 block">
          Go Shopping
        </Link>
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item._id} className="flex items-center gap-4 border-b py-4">
          <img src={item.images?.[0]?.url} alt={item.name} className="w-20 h-20 object-cover rounded" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-500">Qty: {item.quantity}</p>
            <p>₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</p>
          </div>
          <button
            onClick={() => removeFromCart(item._id)}
            className="text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="mt-6 text-right text-xl font-semibold">
        Total: ₹{total}
      </div>
    </div>
  );
}

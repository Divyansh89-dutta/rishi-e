import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
    const { cartItems } = useCart(); // Assuming you have a CartContext

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        🛍️ ShopEasy
      </Link>

      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="hidden sm:inline">👋 {user.name}</span>
            <Link to="/cart">Cart ({cartItems.length})</Link>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

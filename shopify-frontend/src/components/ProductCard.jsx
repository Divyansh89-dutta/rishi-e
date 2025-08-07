import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="w-full h-48 object-cover mb-3 rounded"
        />
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-500 text-sm">{product.brand}</p>
        <p className="font-bold text-blue-600 mt-1">₹{product.price}</p>
      </Link>
    </div>
  );
}

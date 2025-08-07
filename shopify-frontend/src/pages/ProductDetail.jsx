import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/products";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);

        // ✅ Check if product is returned directly or wrapped
        if (data && data._id) {
          setProduct(data); // product returned directly
        } else if (data && data.product) {
          setProduct(data.product); // product wrapped inside `product`
        } else {
          setProduct(null); // fallback if format is unexpected
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <img
        src={product.images?.[0]?.url || "/placeholder.jpg"} // fallback image
        alt={product.name}
        className="w-full h-80 object-cover rounded"
      />
      <div>
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-gray-500">{product.brand}</p>
        <p className="text-lg font-semibold mt-2">₹{product.price}</p>
        <p className="mt-4">{product.description}</p>

        <div className="mt-4 flex items-center gap-2">
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-16 border px-2 py-1"
          />
          <button
            onClick={() => addToCart(product, qty)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

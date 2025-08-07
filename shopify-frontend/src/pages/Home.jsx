import { useEffect, useState } from "react";
import { getAllProducts } from "../api/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        console.log("Fetched products:", data); // ✅ optional: debug log

        // Handle if data is an object with products or just an array
        if (Array.isArray(data)) {
          setProducts(data); // if API returns just an array
        } else if (Array.isArray(data.products)) {
          setProducts(data.products); // if API returns { products: [...] }
        } else {
          setProducts([]); // fallback
        }
      } catch (err) {
        console.error("Failed to load products:", err);
        setProducts([]); // fallback to avoid undefined
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛍️ Latest Products</h1>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

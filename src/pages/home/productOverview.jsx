import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ImageSlider from "../../components/imageSlider";
import { addToCart } from "../../utils/cart";

export default function ProductOverview() {
  const { key } = useParams();
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState({});
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${key}`)
      .then((res) => {
        setProduct(res.data);
        setStatus("success");
      })
      .catch((err) => {
        console.error(err);
        toast.error("⚠️ Failed to load product");
        setStatus("error");
      });
  }, [key]);

  const handleAdd = async () => {
    setAdding(true);
    try {
      await addToCart(product.key, 1);
      toast.success("🛒 Added to cart!");
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 text-white">
        <div className="w-14 h-14 border-4 border-gray-600 border-t-yellow-400 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-300 text-lg">Loading product details...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
        <p className="text-xl mb-4">❌ Product not found</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-yellow-500 px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white py-12 px-6 w-screen h-max">
      <div className="max-w-6xl mx-auto bg-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* Image Section */}
        <div className="lg:w-1/2 bg-slate-700 p-6 flex justify-center items-center">
          <ImageSlider images={product.img} />
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2 p-8 flex flex-col justify-center space-y-6">
          <div>
            <p className="text-sm text-yellow-400 mb-2 uppercase">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
            <p className="text-gray-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 bg-green-700/20 p-4 rounded-xl text-center">
              <p className="text-sm text-green-400">Price</p>
              <p className="text-2xl font-bold text-green-300">
                Rs. {product.price?.toFixed(2)}
              </p>
            </div>
            <div className="flex-1 bg-blue-700/20 p-4 rounded-xl text-center">
              <p className="text-sm text-blue-400">Dimensions</p>
              <p className="text-lg font-semibold text-blue-300">
                {product.dimensions}
              </p>
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={adding}
            className="w-full py-3 rounded-xl bg-yellow-500 text-black font-bold text-lg hover:bg-yellow-400 transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {adding ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </>
            ) : (
              <>
                Add to Cart <span>🛒</span>
              </>
            )}
          </button>

          <div className="pt-2 text-gray-400 text-sm">
            ✓ Premium quality &nbsp; ✓ Perfect for your setup &nbsp; ✓ Great value
          </div>
        </div>
      </div>
    </div>
  );
}

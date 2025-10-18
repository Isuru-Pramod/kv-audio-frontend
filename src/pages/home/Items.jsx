import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";

export default function Items() {
  const [state, setState] = useState("loading"); // loading, success, error
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (state === "loading") {
      axios
        .get("http://localhost:5000/api/products")
        .then((res) => {
          setItems(res.data);
          setState("success");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message || "An error occurred");
          setState("error");
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 pt-24 pb-16 w-screen h-max">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 tracking-wide drop-shadow-lg">
          Our Audio Collection
        </h1>
        <p className="text-gray-100 mt-3 text-lg">
          Explore premium-quality audio equipment available for rent at <span className="font-semibold text-yellow-600">KV Audio</span>.
        </p>
        <div className="w-24 h-1 bg-yellow-400 mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Loading Spinner */}
      {state === "loading" && (
        <div className="flex justify-center items-center h-[300px]">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-yellow-500 rounded-full animate-spin"></div>
            <span className="absolute inset-0 flex items-center justify-center text-yellow-500 font-semibold">
              Loading...
            </span>
          </div>
        </div>
      )}

      {/* Error State */}
      {state === "error" && (
        <div className="flex flex-col justify-center items-center h-[300px] text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Oops! Something went wrong.</h2>
          <p className="text-gray-600 mb-4">Please check your connection or try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-all"
          >
            Retry
          </button>
        </div>
      )}

      {/* Product Grid */}
      {state === "success" && (
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.key}
                className="transform hover:scale-[1.03] transition-all duration-300"
              >
                <ProductCard item={item} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-xl py-10">
              No items available at the moment.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
  return (
    <div className="relative w-[300px] bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl border border-gray-200 hover:border-yellow-400 transition-all duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative w-full h-52 overflow-hidden rounded-t-2xl">
        <img
          src={item.img[0]}
          alt={item.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        {/* Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col h-[360px]">
        {/* Title and Price */}
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
            {item.name}
          </h2>
          <p className="text-lg text-yellow-600 font-semibold mt-1">
            Rs. {item.price.toLocaleString()}
          </p>
        </div>

        {/* Details */}
        <div className="mt-3 text-sm text-gray-600 space-y-1">
          <p>
            <span className="font-semibold text-gray-700">Category:</span>{" "}
            {item.category}
          </p>
          {item.dimensions && (
            <p>
              <span className="font-semibold text-gray-700">Dimensions:</span>{" "}
              {item.dimensions}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="mt-3 text-gray-700 text-sm leading-snug">
          {item.description.length > 90
            ? item.description.slice(0, 90) + "..."
            : item.description}
        </p>

        {/* Availability badge */}
        <div className="mt-4">
          <span
            className={`inline-block px-3 py-1 text-xs font-medium rounded-full shadow-sm ${
              item.availability
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {item.availability ? "Available" : "Out of Stock"}
          </span>
        </div>

        {/* Add to Cart / View Button */}
        <Link
          to={"/product/" + item.key}
          className="mt-auto w-full py-2.5 text-center rounded-xl bg-yellow-500 text-black font-semibold shadow-md hover:bg-yellow-400 hover:shadow-yellow-300/50 transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default function ProductCard({ item }) {
    return (
        <div className="relative w-[300px] h-[520px] bg-white rounded-2xl shadow-lg border border-gray-100 hover:scale-105 transition-transform duration-300">
            {/* Product Image */}
            <div className="w-full h-48 overflow-hidden">
                <img 
                    src={item.img[0]} 
                    alt={item.name} 
                    className="w-full h-full object-cover rounded-t-2xl"
                />
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col justify-between h-[calc(100%-192px)]">
                {/* Title and Price */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900">{item.name}</h2>
                    <p className="text-lg text-indigo-600 font-semibold mt-1">Rs. {item.price.toLocaleString()}</p>
                </div>

                {/* Details */}
                <div className="mt-3 text-sm text-gray-600 space-y-1">
                    <p><span className="font-semibold text-gray-700">Category:</span> {item.category}</p>
                    <p><span className="font-semibold text-gray-700">Dimensions:</span> {item.dimensions}</p>
                </div>

                {/* Description */}
                <p className="mt-3 text-gray-700 text-sm leading-snug">
                    {item.description.length > 100 
                        ? item.description.slice(0, 100) + "..." 
                        : item.description}
                </p>

                {/* Availability badge */}
                <div className="mt-3">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full 
                        ${item.availability 
                            ? "bg-green-100 text-green-700" 
                            : "bg-red-100 text-red-700"}`}>
                        {item.availability ? "In Stock" : "Out of Stock"}
                    </span>
                </div>

                {/* Add to Cart Button */}
                <button className="mt-auto w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:from-blue-600 hover:to-indigo-700 transition-colors duration-300">
                    Add to Cart 
                </button>
            </div>
        </div>
    );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { LuCirclePlus } from "react-icons/lu";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

export default function AdminItemsPage() {
  const [items, setItems] = useState([]);
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!itemsLoaded) {
      const token = localStorage.getItem("token");

      axios
        .get("http://localhost:5000/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setItems(res.data);
          setItemsLoaded(true);
        })
        .catch((err) => console.error(err));
    }
  }, [itemsLoaded]);

  const handleDelete = (key) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const token = localStorage.getItem("token");

      axios
        .delete(`http://localhost:5000/api/products/${key}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => setItemsLoaded(false))
        .catch((err) => console.error(err));
    }
  };

  const toggleExpand = (key) => {
    setExpandedRow(expandedRow === key ? null : key);
  };

  return (
    <div className="w-full h-full p-4 md:p-6 text-white flex flex-col items-center min-h-screen">

      {!itemsLoaded && (
		<div className="flex justify-center items-center h-[300px]">
			<div className="border-4 border-gray-700 border-t-blue-500 rounded-full w-20 h-20 animate-spin"></div>
		</div>
      )}

      {/* Items List */}
      {itemsLoaded && (
        <div className="w-full max-w-7xl bg-gray-800 shadow-lg rounded-2xl p-4 md:p-6">

          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-400">
            Manage Products
          </h1>

          {/* Mobile Card Layout */}
          <div className="md:hidden space-y-4">
            {items.map((product, index) => (
              <div
                key={product.key}
                className="bg-gray-700 p-4 rounded-xl shadow-md"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-300">#{index + 1}</p>
                    <p className="text-lg font-semibold">{product.name}</p>
                    <p className="text-green-400 font-semibold">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Expand Button */}
                  <button
                    onClick={() => toggleExpand(product.key)}
                    className="text-gray-300"
                  >
                    {expandedRow === product.key ? (
                      <IoChevronUp size={22} />
                    ) : (
                      <IoChevronDown size={22} />
                    )}
                  </button>
                </div>

                {/* Expanded Content */}
                {expandedRow === product.key && (
                  <div className="mt-3 border-t border-gray-600 pt-3">
                    <img
                      src={product.image || "/placeholder.png"}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-lg"
                    />

                    <p className="mt-3 text-gray-300">
                      <span className="font-semibold">Category:</span> {product.category}
                    </p>

                    <p
                      className={`font-semibold ${
                        product.availability ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {product.availability ? "Available" : "Not Available"}
                    </p>

                    <p className="text-gray-300">
                      <span className="font-semibold">Description:</span>{" "}
                      {product.description || "No description provided"}
                    </p>

                    <p className="text-gray-400 text-sm">
                      Added On: {new Date(product.createdAt).toLocaleDateString()}
                    </p>

                    {/* Actions */}
                    <div className="flex mt-4 gap-2">
                      <button
                        onClick={() =>
                          navigate("/admin/items/edit", { state: { product } })
                        }
                        className="flex-1 bg-blue-600 py-2 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.key)}
                        className="flex-1 bg-red-600 py-2 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <table className="w-full border-collapse text-left text-base hidden md:table">
            <thead className="bg-gray-700 text-gray-200 uppercase text-sm">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Category</th>
                <th className="p-3">Availability</th>
                <th className="p-3 text-center">Actions</th>
                <th className="p-3 text-center">Expand</th>
              </tr>
            </thead>

            <tbody>
              {items.map((product, index) => (
                <>
                  <tr
                    key={product.key}
                    className={`border-b border-gray-700 hover:bg-gray-700 ${
                      expandedRow === product.key ? "bg-gray-700" : ""
                    }`}
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-medium">{product.name}</td>
                    <td className="p-3 text-green-400 font-semibold">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="p-3">{product.category}</td>
                    <td
                      className={`p-3 font-semibold ${
                        product.availability ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {product.availability ? "Available" : "Not Available"}
                    </td>

                    <td className="p-3 flex gap-2 justify-center flex-wrap">
                      <button
                        onClick={() =>
                          navigate("/admin/items/edit", { state: { product } })
                        }
                        className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.key)}
                        className="bg-red-600 text-white px-4 py-1.5 rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() => toggleExpand(product.key)}
                        className="text-gray-400 hover:text-white"
                      >
                        {expandedRow === product.key ? (
                          <IoChevronUp size={20} />
                        ) : (
                          <IoChevronDown size={20} />
                        )}
                      </button>
                    </td>
                  </tr>

                  {expandedRow === product.key && (
                    <tr className="bg-gray-700 border-b border-gray-600 hidden md:table-row">
                      <td colSpan="7" className="p-4">
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                          <img
                            src={product.image || "/placeholder.png"}
                            alt={product.name}
                            className="w-32 h-32 object-cover rounded-lg"
                          />

                          <div className="flex-1">
                            <p className="text-gray-300 mb-2">
                              <span className="font-semibold">Description:</span>{" "}
                              {product.description || "No description provided"}
                            </p>
                            <p className="text-gray-400">
                              <span className="font-semibold">Dimensions:</span>{" "}
                              {product.dimensions || "N/A"}
                            </p>
                            <p className="text-gray-400">
                              <span className="font-semibold">Added On:</span>{" "}
                              {new Date(product.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Button FAB */}
      <Link
        to="/admin/items/add"
        className="fixed bottom-6 right-6 bg-white rounded-full shadow-xl"
      >
        <LuCirclePlus className="text-red-600 text-[70px] hover:text-red-800" />
      </Link>
    </div>
  );
}

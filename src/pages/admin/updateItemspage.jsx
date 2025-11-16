import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/midiaUplord";

export default function UpdateItemsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [productKey, setProductKey] = useState(location.state.product.key);
  const [productName, setProductName] = useState(location.state.product.name);
  const [productPrice, setProductPrice] = useState(location.state.product.price);
  const [productCategory, setProductCategory] = useState(location.state.product.category);
  const [productDimensions, setProductDimensions] = useState(location.state.product.dimensions);
  const [productDescription, setProductDescription] = useState(location.state.product.description);
  const [productImages, setProductImages] = useState([]);
  const [previewImages, setPreviewImages] = useState(location.state.product.img || []);

  async function handleUpdateItem() {
    let updatingImages = location.state.product.img || [];
    const promises = [];

    for (let i = 0; i < productImages.length; i++) {
      const promise = mediaUpload(productImages[i]);
      promises.push(promise);
    }

    if (promises.length > 0) {
      updatingImages = await Promise.all(promises);
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const result = await axios.put(
        `http://localhost:5000/api/products/${productKey}`,
        {
          name: productName,
          price: productPrice,
          category: productCategory,
          dimensions: productDimensions,
          description: productDescription,
          img: updatingImages,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      toast.success(result.data.message);
      navigate("/admin/items");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update item");
    }
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-2xl bg-gray-800 shadow-xl rounded-2xl p-6 transition-all duration-300">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-400">
          Update Product
        </h1>

        <div className="flex flex-col gap-4">
          {/* Product Key (Disabled) */}
          <input
            disabled
            onChange={(e) => setProductKey(e.target.value)}
            type="text"
            placeholder="Product Key"
            value={productKey}
            className="w-full p-3 border border-gray-700 bg-gray-700 text-gray-400 rounded-lg cursor-not-allowed"
          />

          {/* Product Name */}
          <input
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            placeholder="Product Name"
            value={productName}
            className="w-full p-3 border border-gray-600 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Product Price */}
          <input
            onChange={(e) => setProductPrice(e.target.value)}
            type="number"
            placeholder="Product Price"
            value={productPrice}
            className="w-full p-3 border border-gray-600 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Category Dropdown */}
          <select
            className="w-full p-3 border border-gray-600 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setProductCategory(e.target.value)}
            value={productCategory}
          >
            <option value="">Choose Category</option>
            <option value="Audio">Audio</option>
            <option value="Light">Light</option>
            <option value="DJ_Equipment">DJ Equipment</option>
            <option value="Wireless_Systems">Wireless_Systems</option>
            <option value="Monitoring">Monitoring</option>
            <option value="Other">other</option>
          </select>

          {/* Dimensions */}
          <input
            onChange={(e) => setProductDimensions(e.target.value)}
            type="text"
            placeholder="Product Dimensions"
            value={productDimensions}
            className="w-full p-3 border border-gray-600 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Description */}
          <textarea
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Product Description"
            value={productDescription}
            className="w-full p-3 border border-gray-600 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
          />

          {/* Image Upload */}
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-600 bg-gray-900 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Image Preview */}
          {previewImages.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-3 justify-center">
              {previewImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg border border-gray-700 shadow-md"
                />
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6 flex-col sm:flex-row">
            <button
              onClick={handleUpdateItem}
              className="w-full sm:w-1/2 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Update
            </button>
            <button
              onClick={() => navigate("/admin/items")}
              className="w-full sm:w-1/2 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

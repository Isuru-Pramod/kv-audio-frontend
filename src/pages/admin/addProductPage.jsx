import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/midiaUplord";

export default function ProductAddingPage() {
  const [productKey, setProductKey] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDimensions, setProductDimensions] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const navigate = useNavigate();

  // Handle image file selection + preview
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      toast.error("You can upload up to 5 images only.");
      return;
    }
    setProductImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // Handle product add
  async function handleAddItem() {
    if (
      !productKey ||
      !productName ||
      !productPrice ||
      !productCategory ||
      !productDimensions ||
      !productDescription
    ) {
      toast.error("Please fill in all fields!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first!");
      return;
    }

    try {
      const uploadPromises = productImages.map((img) => mediaUpload(img));
      const imageUrls = await Promise.all(uploadPromises);

      const result = await axios.post(
        "http://localhost:5000/api/products",
        {
          key: productKey,
          name: productName,
          price: productPrice,
          category: productCategory,
          dimensions: productDimensions,
          description: productDescription,
          img: imageUrls,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success(result.data.message || "Product added successfully!");
      navigate("/admin/items");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add product. Try again."
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2a0f0f] to-[#1e293b] text-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-lg bg-[#1e293b]/80 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-white tracking-wide">
          🛒 Add New Product
        </h1>

        <div className="space-y-4">
          <input
            onChange={(e) => setProductKey(e.target.value)}
            type="text"
            placeholder="Product Key"
            value={productKey}
            className="w-full p-3 border border-gray-700 rounded-lg bg-[#0f172a] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            placeholder="Product Name"
            value={productName}
            className="w-full p-3 border border-gray-700 rounded-lg bg-[#0f172a] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            onChange={(e) => setProductPrice(e.target.value)}
            type="number"
            placeholder="Product Price (LKR)"
            value={productPrice}
            className="w-full p-3 border border-gray-700 rounded-lg bg-[#0f172a] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            onChange={(e) => setProductCategory(e.target.value)}
            value={productCategory}
            className="w-full p-3 border border-gray-700 rounded-lg bg-[#0f172a] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Audio">Audio</option>
            <option value="Light">Light</option>
            <option value="DJ_Equipment">DJ Equipment</option>
            <option value="Wireless_Systems">Wireless_Systems</option>
            <option value="Monitoring">Monitoring</option>
            <option value="Other">other</option>
          </select>

          <input
            onChange={(e) => setProductDimensions(e.target.value)}
            type="text"
            placeholder="Product Dimensions"
            value={productDimensions}
            className="w-full p-3 border border-gray-700 rounded-lg bg-[#0f172a] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Product Description"
            value={productDescription}
            rows={4}
            className="w-full p-3 border border-gray-700 rounded-lg bg-[#0f172a] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div>
            <label className="block mb-2 text-gray-300 font-medium">
              Upload Images (max 5)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-700 rounded-lg bg-[#0f172a] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {previewImages.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {previewImages.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="preview"
                    className="w-full h-28 object-cover rounded-lg border border-gray-700 hover:scale-105 transition-transform"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleAddItem}
              className="w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add Product
            </button>
            <button
              onClick={() => navigate('/admin/items')}
              className="w-1/2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

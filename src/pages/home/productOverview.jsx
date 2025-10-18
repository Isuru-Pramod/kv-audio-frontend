import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ImageSlider from "../../components/imageSlider";
import { addToCart, loadCart } from "../../utils/cart";

export default function ProductOverview() {
    const params = useParams();
    const key = params.key;
    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [product, setProduct] = useState({});
    const [addingToCart, setAddingToCart] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products/${key}`)
            .then((res) => {
                setProduct(res.data);
                setLoadingStatus("loaded");
            })
            .catch((err) => {
                console.log(err);
                setLoadingStatus("error");
            });
    }, []);

    const handleAddToCart = async () => {
        setAddingToCart(true);
        try {
            await addToCart(product.key, 1);
            toast.success("🎉 Added to Cart!");
        } catch (error) {
            toast.error("Failed to add item to cart");
        } finally {
            setAddingToCart(false);
        }
    };

    if (loadingStatus === "loading") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="w-20 h-20 border-4 border-blue-200 border-t-accent animate-spin rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg font-medium">Loading amazing product...</p>
                </div>
            </div>
        );
    }

    if (loadingStatus === "error") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 flex items-center justify-center p-4">
                <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⚠️</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h1>
                    <p className="text-gray-600 mb-4">We couldn't load this product. Please try again later.</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-accent text-white px-6 py-3 rounded-full hover:bg-accent/90 transition-all duration-300 font-medium"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {loadingStatus === "loaded" && (
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                        {/* Mobile Header */}
                        <div className="md:hidden bg-gradient-to-r from-accent to-yellow-600 text-white p-6">
                            <h1 className="text-2xl font-bold text-center">{product.name}</h1>
                            <p className="text-blue-100 text-center mt-1">{product.category}</p>
                        </div>

                        <div className="flex flex-col lg:flex-row">
                            {/* Image Section */}
                            <div className="w-full lg:w-1/2 p-6 lg:p-8">
                                <div className="bg-gray-50 rounded-2xl p-4 shadow-inner">
                                    <ImageSlider images={product.img} />
                                </div>
                            </div>

                            {/* Product Info Section */}
                            <div className="w-full lg:w-1/2 p-6 lg:p-8 ">
                                <div className="space-y-6">
                                    {/* Desktop Header */}
                                    <div className="hidden md:block">
                                        <div className="inline-block bg-gray-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-3">
                                            category: {product.category}
                                        </div>
                                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                            {product.name}
                                        </h1>
                                    </div>

                                    {/* Description */}
                                    <div className="bg-blue-50 rounded-2xl p-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                            <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                                            About this product
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed text-lg">
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* Price & Dimensions */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-green-50 rounded-2xl p-4 text-center">
                                            <p className="text-sm text-green-600 font-medium mb-1">Price</p>
                                            <p className="text-2xl font-bold text-green-700">
                                                Rs. {product.price?.toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="bg-purple-50 rounded-2xl p-4 text-center">
                                            <p className="text-sm text-purple-600 font-medium mb-1">Dimensions</p>
                                            <p className="text-lg font-semibold text-purple-700">
                                                {product.dimensions}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={addingToCart}
                                        className="w-full bg-yellow-500  hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center space-x-2"
                                    >
                                        {addingToCart ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Adding...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Add to Cart</span>
                                                <span className="text-lg">🛒</span>
                                            </>
                                        )}
                                    </button>

                                    {/* Features */}
                                    <div className="bg-gray-50 rounded-2xl p-6">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Why you'll love it</h4>
                                        <ul className="space-y-2 text-gray-600">
                                            <li className="flex items-center">
                                                <span className="text-green-500 mr-2">✓</span>
                                                Premium quality materials
                                            </li>
                                            <li className="flex items-center">
                                                <span className="text-green-500 mr-2">✓</span>
                                                Perfect dimensions for your space
                                            </li>
                                            <li className="flex items-center">
                                                <span className="text-green-500 mr-2">✓</span>
                                                Excellent value for money
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
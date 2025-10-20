import { useEffect, useState } from "react";
import { formatDate, loadCart } from "../../utils/cart";
import BookingItem from "../../components/bookingItem";
import axios from "axios";
import toast from "react-hot-toast";

export default function BookingPage() {
  const [cart, setCart] = useState(loadCart());
  const [startingDate, setStartingDate] = useState(formatDate(new Date()));
  const [endingDate, setEndingDate] = useState(
    formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000))
  );
  const [total, setTotal] = useState(0);

  const daysBetween = Math.max(
    (new Date(endingDate) - new Date(startingDate)) / (1000 * 60 * 60 * 24),
    1
  );

  function reloadCart() {
    setCart(loadCart());
    calculateTotal();
  }

  function calculateTotal() {
    const cartInfo = loadCart();
    cartInfo.startingDate = startingDate;
    cartInfo.endingDate = endingDate;
    cartInfo.days = daysBetween;

    axios
      .post("http://localhost:5000/api/orders/quote", cartInfo)
      .then((res) => {
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to calculate total");
      });
  }

  useEffect(() => {
    calculateTotal();
  }, [startingDate, endingDate]);

  function handleBookingCreation() {
    const cart = loadCart();
    cart.startingDate = startingDate;
    cart.endingDate = endingDate;
    cart.days = daysBetween;

    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:5000/api/orders", cart, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        localStorage.removeItem("cart");
        toast.success("Booking Created Successfully!");
        setCart(loadCart());
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to create booking");
      });
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-10 px-4 w-screen h-max pt-32">
      <div className="w-full max-w-4xl bg-gray-700 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6">
          Create Your Booking
        </h1>

        {/* Date Selection */}
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-8">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-200 mb-1">
              Starting Date:
            </label>
            <input
              type="date"
              value={startingDate}
              onChange={(e) => setStartingDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:ring-2 bg-gray-500 focus:ring-yellow-400 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-200 mb-1">
              Ending Date:
            </label>
            <input
              type="date"
              value={endingDate}
              onChange={(e) => setEndingDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 outline-none bg-gray-500"
            />
          </div>
        </div>

        <p className="text-center text-gray-200 font-medium mb-6">
          Total Days:{" "}
          <span className="text-yellow-500 font-semibold">{daysBetween}</span>
        </p>

        {/* Booking Items */}
        <div className="space-y-4">
          {cart.orderedItems.length > 0 ? (
            cart.orderedItems.map((item) => (
              <BookingItem
                itemKey={item.key}
                key={item.key}
                qty={item.qty}
                refresh={reloadCart}
              />
            ))
          ) : (
            <p className="text-center text-gray-200 italic">
              Your cart is empty.
            </p>
          )}
        </div>

        {/* Total + Button */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-2xl font-semibold text-gray-200">
            Total:{" "}
            <span className="text-yellow-400">
              Rs. {total ? total.toFixed(2) : "0.00"}
            </span>
          </p>

          <button
            className="mt-4 md:mt-0 bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-all shadow-md"
            onClick={handleBookingCreation}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

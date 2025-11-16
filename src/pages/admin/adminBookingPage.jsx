import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeOrder, setActiveOrder] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/orders/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    if (loading) fetchOrders();
  }, [loading]);

  const handleOrderStatusChange = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/orders/status/${orderId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setModalOpened(false);
      setLoading(true);
    } catch (error) {
      console.error(error);
      setLoading(true);
    }
  };

  const StatusBadge = ({ status }) => {
    const statusStyles = {
      approved: "bg-green-700 text-green-200",
      Rejected: "bg-red-700 text-red-200",
      pending: "bg-yellow-700 text-yellow-200",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
          statusStyles[status] || "bg-gray-700 text-gray-300"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="p-4 sm:p-6 text-gray-100 bg-gray-950 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-yellow-400 tracking-wide">
        Orders Management
      </h1>

      {/* Loading */}
      {loading ? (
		<div className="flex justify-center items-center h-[300px]">
			<div className="border-4 border-gray-700 border-t-blue-500 rounded-full w-20 h-20 animate-spin"></div>
		</div>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">

          {/* Desktop Table */}
          <table className="hidden md:table min-w-full border-collapse text-sm">
            <thead className="bg-gray-800 text-yellow-400">
              <tr>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Days</th>
                <th className="px-4 py-3 text-left">Start Date</th>
                <th className="px-4 py-3 text-left">End Date</th>
                <th className="px-4 py-3 text-left">Total (LKR)</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Order Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => {
                    setActiveOrder(order);
                    setModalOpened(true);
                  }}
                  className="border-t border-gray-800 hover:bg-gray-800 cursor-pointer transition-all duration-200"
                >
                  <td className="px-4 py-2">{order.orderId}</td>
                  <td className="px-4 py-2">{order.email}</td>
                  <td className="px-4 py-2">{order.days}</td>
                  <td className="px-4 py-2">
                    {new Date(order.startingDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(order.endingDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 font-semibold text-yellow-300">
                    {order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-2">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                onClick={() => {
                  setActiveOrder(order);
                  setModalOpened(true);
                }}
                className="bg-gray-900 rounded-xl p-4 border border-gray-800 shadow hover:bg-gray-800 transition cursor-pointer"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-yellow-300">
                    Order #{order.orderId}
                  </h3>
                  <StatusBadge status={order.status} />
                </div>

                <p className="text-sm text-gray-400">Email: {order.email}</p>
                <p className="text-sm text-gray-400">Days: {order.days}</p>
                <p className="text-sm text-gray-400">
                  Start: {new Date(order.startingDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-400">
                  End: {new Date(order.endingDate).toLocaleDateString()}
                </p>
                <p className="text-yellow-300 font-bold mt-1">
                  LKR {order.totalAmount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== Modal ===== */}
      {modalOpened && activeOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-3 overflow-auto">
          <div className="w-full max-w-lg bg-gray-900 rounded-xl shadow-2xl p-5 relative text-gray-100">

            <IoMdCloseCircleOutline
              className="absolute top-3 right-3 text-3xl cursor-pointer hover:text-red-500 transition"
              onClick={() => setModalOpened(false)}
            />

            <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-yellow-400">
              Order Details
            </h2>

            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Order ID:</span> {activeOrder.orderId}</p>
              <p><span className="font-semibold">Email:</span> {activeOrder.email}</p>
              <p><span className="font-semibold">Days:</span> {activeOrder.days}</p>
              <p>
                <span className="font-semibold">Starting Date:</span>{" "}
                {new Date(activeOrder.startingDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Ending Date:</span>{" "}
                {new Date(activeOrder.endingDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Total:</span> LKR{" "}
                {activeOrder.totalAmount.toFixed(2)}
              </p>
              <p>
                <span className="font-semibold">Order Date:</span>{" "}
                {new Date(activeOrder.orderDate).toLocaleDateString()}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <button
                onClick={() =>
                  handleOrderStatusChange(activeOrder.orderId, "approved")
                }
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold transition w-full sm:w-auto"
              >
                Approve
              </button>
              <button
                onClick={() =>
                  handleOrderStatusChange(activeOrder.orderId, "Rejected")
                }
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold transition w-full sm:w-auto"
              >
                Reject
              </button>
            </div>

            {/* Ordered Items List */}
            <div className="mt-6 border-t border-gray-700 pt-4 overflow-x-auto">
              <h3 className="text-lg font-semibold mb-2 text-yellow-400">
                Ordered Items
              </h3>

              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-3 py-2">Image</th>
                    <th className="px-3 py-2">Product</th>
                    <th className="px-3 py-2">Qty</th>
                    <th className="px-3 py-2">Price</th>
                  </tr>
                </thead>

                <tbody>
                  {activeOrder.orderedItems.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-t border-gray-700 hover:bg-gray-800 transition"
                    >
                      <td className="px-3 py-2">
                        <img
                          src={item.product.img}
                          alt={item.product.name}
                          className="w-10 h-10 rounded-md object-cover"
                        />
                      </td>
                      <td className="px-3 py-2">{item.product.name}</td>
                      <td className="px-3 py-2">{item.quantity}</td>
                      <td className="px-3 py-2 text-yellow-300 font-medium">
                        {item.product.price}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

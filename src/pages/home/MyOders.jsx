import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [userEmail, setUserEmail] = useState("");

  // Fetch logged-in user email
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const user = res.data;
        setUserEmail(user.email);
      })
      .catch((err) => console.error(err));
  }, []);

  // Fetch all orders and filter by user email
  useEffect(() => {
    if (!userEmail) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const filtered = res.data.filter(
          (order) => order.email === userEmail
        );

        setOrders(filtered);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userEmail]);

  // Status Badge Component
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

    <div>
          <div className="p-4 sm:p-6 text-gray-100 bg-gray-950 h-max w-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-yellow-400 tracking-wide">
        My Orders
      </h1>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center h-[300px] flex-col">
          
        {token && (
          <div className="border-4 border-gray-700 border-t-blue-500 rounded-full w-20 h-20 animate-spin"></div>
      )}
        {!token && (
          <div > You are not logged in</div>
      )}

        </div>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500 mt-[100px] mb-[300px]">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition duration-300"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <h2 className="text-lg font-semibold text-yellow-400">
                  Order #{order.orderId}
                </h2>

                <StatusBadge status={order.status} />
              </div>

              {/* Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-sm text-gray-300">
                <p>
                  <span className="text-gray-500">Days:</span> {order.days}
                </p>
                <p>
                  <span className="text-gray-500">Start:</span>{" "}
                  {new Date(order.startingDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="text-gray-500">End:</span>{" "}
                  {new Date(order.endingDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="text-gray-500">Ordered:</span>{" "}
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>

              {/* Total */}
              <div className="mt-4 text-right">
                <p className="text-xl font-bold text-green-400">
                  LKR {order.totalAmount.toFixed(2)}
                </p>
              </div>

              {/* Items */}
              <div className="mt-5 border-t border-gray-700 pt-4">
                <h3 className="text-md font-semibold mb-3 text-yellow-500">
                  Items
                </h3>

                <div className="space-y-3">
                  {order.orderedItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg"
                    >
                      <img
                        src={item.product.img}
                        className="w-14 h-14 rounded-lg object-cover"
                        alt=""
                      />

                      <div className="flex-1">
                        <p className="font-medium text-gray-200">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="text-yellow-300 font-semibold">
                        LKR {item.product.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
      <Footer/>
    </div>
    
  );
}

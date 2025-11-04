import { FaRegBookmark, FaRegUser, FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineSpeaker, MdOutlineMessage, MdOutlineRateReview } from "react-icons/md";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminItemsPage from "./adminItemsPage";
import ProductAddingPage from "./addProductPage";
import UpdateItemPage from "./updateItemspage";
import AdminUsersPage from "./adminUsersPage";
import AdminOrdersPage from "./adminBookingPage";
import AdminReviewPage from "./adminReviewPage";
import AdminInquiries from "./adminInquiries";

export default function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }
    axios
      .get(`http://localhost:5000/api/users/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const user = res.data;
        if (user.role === "admin") {
          setUserValidated(true);
          setAdminName(user.name || "Admin");
        } else {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.error(err);
        setUserValidated(false);
      });
  }, []);

  const menuItems = [
    { path: "/admin/orders", icon: <FaRegBookmark />, label: "Orders" },
    { path: "/admin/inquiries", icon: <MdOutlineMessage />, label: "Inquiries" },
    { path: "/admin/items", icon: <MdOutlineSpeaker />, label: "Items" },
    { path: "/admin/users", icon: <FaRegUser />, label: "Users" },
    { path: "/admin/reviews", icon: <MdOutlineRateReview />, label: "Reviews" },
  ];

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-800 flex flex-col justify-between transform transition-transform duration-300 z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div>
          <div className="h-16 flex items-center justify-center text-2xl font-extrabold text-yellow-400 tracking-widest border-b border-gray-800">
            KV Admin
          </div>

          <nav className="flex flex-col mt-4 px-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-yellow-400 text-black font-semibold shadow-md"
                    : "hover:bg-gray-800 text-gray-300"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout */}
        {token && (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="m-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
          >
            Logout
          </button>
        )}
      </aside>

      {/* Overlay (for mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full">
        {/* Top Bar */}
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 shadow-lg sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* Hamburger for mobile */}
            <button
              className="text-yellow-400 text-2xl md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <h1 className="text-xl font-semibold tracking-wide text-yellow-400">
              Welcome, {adminName}
            </h1>
          </div>
          <span className="text-gray-400 text-sm italic hidden sm:block">
            {new Date().toLocaleString()}
          </span>
        </header>

        {/* Page Content */}
        <section className="flex-1 bg-gray-950 p-4 md:p-6 overflow-y-auto">
          {userValidated && (
            <Routes>
              <Route path="/orders" element={<AdminOrdersPage />} />
              <Route path="/users" element={<AdminUsersPage />} />
              <Route path="/inquiries" element={<AdminInquiries />} />
              <Route path="/items" element={<AdminItemsPage />} />
              <Route path="/reviews" element={<AdminReviewPage />} />
              <Route path="/items/add" element={<ProductAddingPage />} />
              <Route path="/items/edit" element={<UpdateItemPage />} />
            </Routes>
          )}
        </section>
      </main>
    </div>
  );
}

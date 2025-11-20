import { CiHome, CiSpeaker } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { MdPhotoLibrary, MdContacts } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MobileNavPanel({ isOpen, setOpen }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function goTo(route) {
    navigate(route);
    setOpen(false);
  }

  return (
    <>
      {isOpen && (
        <div className="w-full h-screen fixed top-0 left-0 bg-black/60 backdrop-blur-sm z-50 flex">
          
          {/* Sidebar */}
          <div className="h-full bg-[#0f172a] w-[300px] shadow-2xl animate-slide-in relative flex flex-col">

            {/* Header */}
            <div className="w-full h-[80px] flex items-center relative px-4 bg-[#1e293b] shadow-md">
              <img
                src="/images-removebg-preview.png"
                alt="logo"
                className="w-[55px] h-[55px] object-cover border-[2px] border-yellow-400 rounded-full shadow-lg"
              />

              <h2 className="ml-3 text-xl font-bold text-yellow-400 tracking-wide">
                KV Adio
              </h2>

              <IoMdClose
                className="absolute right-4 text-3xl text-white cursor-pointer hover:rotate-90 transition-all duration-300"
                onClick={() => setOpen(false)}
              />
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col mt-6 gap-3 px-4 text-white">
              {[
                { icon: <CiHome className="text-2xl" />, label: "Home", path: "/" },
                { icon: <MdContacts className="text-2xl" />, label: "Contact", path: "/contact" },
                { icon: <MdPhotoLibrary className="text-2xl" />, label: "Gallery", path: "/gallery" },
                { icon: <CiSpeaker className="text-2xl" />, label: "Items", path: "/items" },
                { icon: <FaRegCalendarCheck className="text-2xl" />, label: "Reviews", path: "/reviws" },
                { icon: <FaBoxArchive className="text-2xl" />, label: "My Orders", path: "/myOders" },
                { icon: <FaShoppingCart className="text-2xl" />, label: "Booking", path: "/booking" },
              ].map((item, index) => (
                <div
                  key={index}
                  onClick={() => goTo(item.path)}
                  className="flex items-center gap-3 text-lg px-3 py-3 rounded-lg cursor-pointer
                             hover:bg-yellow-400/20 hover:text-yellow-400 transition-all duration-300"
                >
                  <span className="text-yellow-400">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Login / Logout Section */}
            <div className="mt-6 px-4">
              {token ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                  className="w-full bg-yellow-400 text-[#1e293b] font-semibold py-3 rounded-lg hover:bg-yellow-300 transition-all duration-300"
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => goTo("/login")}
                    className="w-full bg-yellow-400 text-[#1e293b] font-semibold py-3 rounded-lg hover:bg-yellow-300 transition-all duration-300"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => goTo("/register")}
                    className="w-full bg-white text-[#1e293b] font-semibold py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="absolute bottom-5 left-0 w-full flex justify-center">
              <p className="text-gray-500 text-sm">© 2025 KV Adio</p>
            </div>
          </div>

          {/* Sliding Animation */}
          <style>
            {`
              @keyframes slideIn {
                from { transform: translateX(-100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
              }
              .animate-slide-in {
                animation: slideIn 0.4s ease forwards;
              }
            `}
          </style>
        </div>
      )}
    </>
  );
}

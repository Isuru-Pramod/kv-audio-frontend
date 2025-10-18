import { CiHome, CiSpeaker } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { MdPhotoLibrary, MdContacts, MdInfoOutline } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MobileNavPanel({ isOpen, setOpen }) {
  const navigate = useNavigate();

  function goTo(route) {
    navigate(route);
    setOpen(false);
  }

  return (
    <>
      {isOpen && (
        <div className="w-full h-screen fixed top-0 left-0 bg-black/60 backdrop-blur-sm z-50 flex">
          {/* Sidebar */}
          <div className="h-full bg-white w-[300px] shadow-2xl animate-slide-in relative flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-full h-[80px] flex items-center justify-center relative shadow-md">
              <img
                src="/images-removebg-preview.png"
                alt="logo"
                className="w-[65px] h-[65px] object-cover border-[3px] border-white rounded-full shadow-lg absolute left-3"
              />
              <h2 className="text-white text-2xl font-bold drop-shadow-md tracking-wide">
                KV Adio
              </h2>
              <IoMdClose
                className="absolute right-4 text-3xl text-white cursor-pointer hover:rotate-90 transition-all duration-300"
                onClick={() => setOpen(false)}
              />
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col mt-6 gap-3 px-4">
              {[
                { icon: <CiHome className="text-2xl" />, label: "Home", path: "/" },
                { icon: <CiSpeaker className="text-2xl" />, label: "Items", path: "/items" },
                { icon: <MdPhotoLibrary className="text-2xl" />, label: "Gallery", path: "/gallery" },
                { icon: <FaRegCalendarCheck className="text-2xl" />, label: "Booking", path: "/booking" },
                { icon: <MdContacts className="text-2xl" />, label: "Contact", path: "/contact" },
                { icon: <MdInfoOutline className="text-2xl" />, label: "About", path: "/about" },
              ].map((item, index) => (
                <div
                  key={index}
                  onClick={() => goTo(item.path)}
                  className="flex items-center gap-3 text-[20px] text-gray-700 px-3 py-3 rounded-lg cursor-pointer
                            hover:bg-yellow-100 hover:text-yellow-600 transition-all duration-300"
                >
                  <span className="text-yellow-500">{item.icon}</span>
                  <span className="font-semibold">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="absolute bottom-5 left-0 w-full flex justify-center">
              <p className="text-gray-400 text-sm">© 2025 LuxeVista Resort</p>
            </div>
          </div>

          {/* Animation keyframe */}
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

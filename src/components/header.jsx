import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import MobileNavPanel from "./mobileNavPanel";

export default function Header() {
  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const token = localStorage.getItem("token");

  return (
    <header className="fixed top-0 left-0 w-full h-[70px] z-50 backdrop-blur-md bg-gradient-to-r from-[#0f172a]/80 via-[#1e293b]/80 to-[#334155]/80 shadow-lg border-b border-white/10 flex items-center justify-between px-5 sm:px-10 text-white transition-all duration-500">
      
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <img
          src="/images-removebg-preview.png"
          alt="logo"
          className="w-[55px] h-[55px] object-cover rounded-full border-2 border-yellow-400 shadow-md hover:scale-105 transition-transform duration-300"
        />
        <h1 className="text-xl font-bold tracking-wide hidden sm:block">
          KV Adio
        </h1>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-10">
        <Link
          to="/"
          className="relative text-lg font-medium hover:text-yellow-400 transition-all duration-300 group"
        >
          Home
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <Link
          to="/contact"
          className="relative text-lg font-medium hover:text-yellow-400 transition-all duration-300 group"
        >
          Contact
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <Link
          to="/gallery"
          className="relative text-lg font-medium hover:text-yellow-400 transition-all duration-300 group"
        >
          Gallery
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <Link
          to="/items"
          className="relative text-lg font-medium hover:text-yellow-400 transition-all duration-300 group"
        >
          Items
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <Link
          to="/booking"
          className="relative text-2xl hover:text-yellow-400 transition-transform duration-300 hover:scale-110"
          title="Cart"
        >
          <FaCartShopping />
        </Link>
      </nav>

      {/* Logout button (desktop) */}
      {token && (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="hidden md:block text-sm font-semibold px-4 py-2 bg-yellow-400 text-[#1e293b] rounded-lg hover:bg-yellow-300 transition-all duration-300"
        >
          Logout
        </button>
      )}

        {!token && (
          <div className="flex items-center gap-3">
          <button
          onClick={() => {
            window.location.href = "/login";
          }}
          className="hidden md:block text-sm font-semibold px-4 py-2 bg-yellow-400 text-[#1e293b] rounded-lg hover:bg-yellow-300 transition-all duration-300"
        >
          Login
        </button>
        <button
          onClick={() => {
            window.location.href = "/register";
          }}
          className="hidden md:block text-sm font-semibold px-4 py-2 bg-white text-[#1e293b] rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
sign in 
        </button>
        </div>

      )}

      {/* Hamburger Menu for Mobile */}
      <GiHamburgerMenu
        className="md:hidden text-[26px] cursor-pointer hover:text-yellow-400 transition-all duration-300"
        onClick={() => setNavPanelOpen(true)}
      />

      {/* Mobile Navigation Panel */}
      <MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen} />
    </header>
  );
}

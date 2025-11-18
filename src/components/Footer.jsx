import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f1117] text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">KV Audio</h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Your one-stop destination for premium tech and gadgets. 
            Explore the latest products with unbeatable service and fast delivery.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link></li>
            <li><Link to="/items" className="hover:text-yellow-400 transition-colors">Products</Link></li>
            <li><Link to="/gallery" className="hover:text-yellow-400 transition-colors">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400 transition-colors">Contact Us</Link></li>
            <li><Link to="/" className="hover:text-yellow-400 transition-colors">About Us</Link></li>
            <li><Link to="/reviws" className="hover:text-yellow-400 transition-colors">Reviws</Link></li>
            <li><Link to="/myOders" className="hover:text-yellow-400 transition-colors">My Oders</Link></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-3">Contact</h3>
          <p className="flex items-center gap-2 mb-2"><Phone size={16}/> +94 77 123 4567</p>
          <p className="flex items-center gap-2 mb-4"><Mail size={16}/> support@gadgethub.lk</p>

          <div className="flex gap-4 mt-3">
            <a href="#" className="hover:text-yellow-400 transition-transform hover:scale-110">
              <Facebook size={20}/>
            </a>
            <a href="#" className="hover:text-yellow-400 transition-transform hover:scale-110">
              <Instagram size={20}/>
            </a>
            <a href="#" className="hover:text-yellow-400 transition-transform hover:scale-110">
              <Twitter size={20}/>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} <span className="text-yellow-400 font-semibold">GadgetHub</span>. All rights reserved.
      </div>
    </footer>
  );
}

import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";

export default function ErrorNotfound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1117] text-gray-300 px-6 w-screen h-max">
      {/* Animated Icon */}
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-full mb-6 animate-bounce shadow-lg">
        <AlertTriangle className="text-black" size={48} />
      </div>

      {/* Error Message */}
      <h1 className="text-6xl font-extrabold text-yellow-400 drop-shadow-lg mb-3">
        404
      </h1>
      <p className="text-xl text-gray-400 mb-6 text-center">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Back Home Button */}
      <Link
        to="/"
        className="flex items-center gap-2 bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full 
                   hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-md"
      >
        <Home size={20} />
        Go Back Home
      </Link>

      {/* Decorative Glow */}
      <div className="absolute w-[400px] h-[400px] bg-yellow-500/10 blur-[120px] -z-10"></div>
    </div>
  );
}

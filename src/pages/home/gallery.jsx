import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "../../components/Footer";

export default function Gallery() {
  const images = [
    "/piano.jpeg",
    "/mice.jpg",
    "/mice2.jpg",
    "/light system.jpg",
    "/system-lights.jpg",
    "/mxcher.jpg",
    "/s-l1200.jpg",
    "/djSetup.jpg",
    "/zongo-sound-system.jpg",
    "/sound-systems-on-hire.jpg",
    "/headset.jpeg",
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") setSelectedIndex((i) => (i === null ? 0 : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setSelectedIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-16 px-6 text-gray-100 w-screen h-max pt-[100px]">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4 drop-shadow-lg">
          🎶 Our Gallery
        </h1>
        <p className="text-gray-400 text-lg">
          Step into our world of sound, light, and creativity — captured in every frame.
        </p>
        <div className="w-24 h-1 bg-yellow-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {images.map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={src}
              alt={`Gallery ${index + 1}`}
              className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
              <p className="text-yellow-400 text-lg font-semibold tracking-wide">
                View Image
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <X size={32} />
            </button>

            {/* Left Arrow */}
            <button
              onClick={() => setSelectedIndex((selectedIndex - 1 + images.length) % images.length)}
              className="absolute left-4 md:left-10 text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <ChevronLeft size={48} />
            </button>

            {/* Image */}
            <motion.img
              key={images[selectedIndex]}
              src={images[selectedIndex]}
              alt="Selected"
              className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl border border-yellow-500"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            />

            {/* Right Arrow */}
            <button
              onClick={() => setSelectedIndex((selectedIndex + 1) % images.length)}
              className="absolute right-4 md:right-10 text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <ChevronRight size={48} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="text-center mt-16 text-gray-500">
        <p className="italic">✨ Where sound meets light — every frame tells a story.</p>
      </div>
      
    </div>
    <Footer/>
    </div>
    
  );
}

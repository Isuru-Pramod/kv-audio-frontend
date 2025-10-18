import Footer from "../../components/Footer";

export default function Home() {
    const navpage = "home";
  return (
    <div className="bg-black text-white font-sans w-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center w-full">
        <img
          src="/BG.jpg"
          alt="KV Audio background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90"></div>

        <div className="relative z-10 text-center px-6 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-lg">
            KV Audio
          </h1>
          <p className="text-xl md:text-2xl mt-4 text-gray-200 font-light">
            Professional Audio Equipment Rentals in Sri Lanka
          </p>
          <button className="mt-8 px-8 py-3 bg-yellow-400 text-black text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-500 hover:scale-105 transition-all duration-300"
          onClick={() => window.location.href = '/items'}>
            Explore Our Services
          </button>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-black to-gray-900 text-center">
        <h2 className="text-4xl font-bold text-yellow-400 mb-8">About Us</h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          At <span className="text-yellow-400 font-semibold">KV Audio</span>, we bring your events to life through powerful, high-fidelity sound.
          Based in Sri Lanka, we specialize in renting premium audio systems, mixers, and stage lighting equipment
          for weddings, concerts, corporate events, and more.
        </p>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mt-5 leading-relaxed">
          Our mission is simple — deliver professional-grade sound with passion and precision.
          From intimate gatherings to massive outdoor concerts, KV Audio ensures every moment sounds perfect.
        </p>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-950 px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-10">
          Our Rental Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Sound Systems",
              desc: "Speakers, amplifiers, and subwoofers for events of any scale.",
              img: "/sound.jpg",
            },
            {
              title: "Mixers & Consoles",
              desc: "Industry-standard digital and analog mixers for precision sound control.",
              img: "/mixer.jpg",
            },
            {
              title: "Lighting & Stage Gear",
              desc: "Dynamic lighting and truss systems to set the perfect event mood.",
              img: "/lighting.jpg",
            },
          ].map((service, i) => (
            <div
              key={i}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-yellow-400/40 transition-all duration-300"
            >
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-yellow-400 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-lg">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-yellow-400 text-black text-center">
        <h2 className="text-4xl font-bold mb-4">Let’s Make Your Event Sound Perfect</h2>
        <p className="text-lg mb-8">
          Get in touch with KV Audio and bring professional sound to your next event.
        </p>
        <button className="px-10 py-3 bg-black text-yellow-400 text-lg font-bold rounded-lg hover:bg-gray-900 hover:scale-105 transition-all"
        onClick={() => window.location.href = '/contact'}>
          Contact Us
        </button>
      </section>
      <Footer/>
    </div>
  );
}

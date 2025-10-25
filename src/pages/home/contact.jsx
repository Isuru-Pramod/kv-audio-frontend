import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../../components/Footer";

export default function Contact() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({ firstName: "", email: "" });
  const token = localStorage.getItem("token");

  // Fetch logged-in user details
  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:5000/api/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        toast.error("Failed to load user information");
      });
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const result = await axios.post(
        "http://localhost:5000/api/inquiries",
        { message },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(result.data.message || "Inquiry submitted successfully!");
      setMessage("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Inquiry submission failed");
    }
  }

  return (
    <div>
      <div className="bg-gray-950 text-white min-h-screen flex flex-col items-center py-12 px-6 md:px-16 w-screen h-max pt-[100px]">
        <Toaster />
        {/* Header */}
        <h1 className="text-5xl font-extrabold text-yellow-400 mb-6 text-center tracking-wide">
          Contact <span className="text-white">KV Audio</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl text-center mb-12">
          We’re passionate about delivering top-quality audio gear for your events, concerts, and productions.
          Reach out to us for bookings, inquiries, or support — we’re happy to help!
        </p>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl w-full">
          {/* Left - Map & Info */}
          <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2346.240618900378!2d80.00076571593824!3d6.846806051672829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e1!3m2!1sen!2sus!4v1760780074008!5m2!1sen!2sus"
              width="100%"
              height="350"
              allowFullScreen=""
              loading="lazy"
              className="border-0 w-full rounded-t-2xl"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <div className="p-6 space-y-3">
              <h2 className="text-2xl font-semibold text-yellow-400 mb-3">Get In Touch</h2>
              <p className="flex items-center gap-2 text-gray-300">📞 +94 71 234 5678</p>
              <p className="flex items-center gap-2 text-gray-300">✉️ KVAudio@gmail.com</p>
              <p className="flex items-center gap-2 text-gray-300">📍 No. 45 High Level Road, Colombo, Sri Lanka</p>
              <p className="text-gray-400 text-sm italic">*Available 9 AM – 8 PM | 7 Days a Week</p>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 md:p-8">
            <h2 className="text-3xl font-semibold text-yellow-400 mb-6">Send Us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Your Name</label>
                <input
                  type="text"
                  value={user.firstName || ""}
                  readOnly
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Your Email</label>
                <input
                  type="email"
                  value={user.email || ""}
                  readOnly
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
                />
              </div>

              <textarea
                placeholder="Your Message"
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-500 hover:scale-[1.02] transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

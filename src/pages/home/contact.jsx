import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../../components/Footer";

export default function Contact() {
  const [message, setMessage] = useState("");
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // ✅ Load user's inquiries
  const loadInquiries = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/inquiries", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInquiries(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  // ✅ Send new inquiry
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Message cannot be empty!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/inquiries",
        { message },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Inquiry sent successfully!");
      setMessage("");
      loadInquiries();
    } catch (err) {
      console.error(err);
      toast.error("Failed to send inquiry");
    }
  };

  // ✅ Delete inquiry
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/inquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Inquiry deleted successfully!");
      loadInquiries();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete inquiry");
    }
  };

  return (
    <div>
      <div className="bg-gray-950 text-white min-h-screen flex flex-col items-center py-12 px-6 md:px-16 w-screen h-max pt-[100px]">
        <Toaster position="top-right" />

        <h1 className="text-5xl font-extrabold text-yellow-400 mb-6 text-center tracking-wide">
          Contact <span className="text-white">KV Audio</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl text-center mb-12">
          We’re passionate about delivering top-quality audio gear for your events, concerts, and productions.
          Reach out to us for bookings, inquiries, or support — we’re happy to help!
        </p>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl w-full">
          {/* ✅ Left - Info */}
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

          {/* ✅ Right - Contact Form */}
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 md:p-8">
            <h2 className="text-3xl font-semibold text-yellow-400 mb-6">Send Us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                placeholder="Your Message"
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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

        {/* ✅ Inquiry History */}
        <div className="max-w-5xl w-full mt-16">
          <h2 className="text-3xl font-semibold text-yellow-400 mb-4 text-center">Your Inquiries</h2>

          {loading ? (
            <p className="text-gray-400 text-center">Loading...</p>
          ) : inquiries.length === 0 ? (
            <p className="text-gray-400 text-center">No inquiries yet.</p>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-gray-800 p-5 rounded-xl border border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-200 mb-1">{inq.message}</p>
                      <p className="text-xs text-gray-500">
                        Sent on {new Date(inq.date).toLocaleString()}
                      </p>

                      {inq.reply && (
                        <div className="mt-3 p-3 bg-gray-900 border border-yellow-500 rounded-lg">
                          <p className="text-yellow-400 font-semibold">Admin Reply:</p>
                          <p className="text-gray-200 mt-1">{inq.reply}</p>
                          {inq.repliedAt && (
                            <p className="text-xs text-gray-500 mt-1">
                              Replied on {new Date(inq.repliedAt).toLocaleString()}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleDelete(inq.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

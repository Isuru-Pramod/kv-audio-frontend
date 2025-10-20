import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react"; // clean modern delete icon

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // ✅ Get logged-in user data from JWT (localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
      } catch (e) {
        console.error("Invalid token");
      }
    }
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const res = await axios.get("http://localhost:5000/api/reviews");
      setReviews(res.data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load reviews");
      setLoading(false);
    }
  }

  // ✅ Submit new review
  async function handleSubmit() {
    if (!comment || rating === 0) {
      toast.error("Please enter your review and rating");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const result = await axios.post(
        "http://localhost:5000/api/reviews",
        { comment, rating },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success(result.data.message || "Review submitted successfully!");
      setComment("");
      setRating(0);
      fetchReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || "Review submission failed");
    }
  }

  // ✅ Delete a review (only user's own or admin)
  async function handleDelete(email) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (!window.confirm("Are you sure you want to delete your review?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/reviews/${email}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast.success("Review deleted successfully");
      fetchReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || "Review deletion failed");
    }
  }

  return (
    <div className="bg-gray-900 text-white w-full min-h-screen pt-[100px] h-max flex flex-col items-center px-6">
      <h1 className="text-yellow-400 text-5xl font-extrabold mb-8 text-center">
        Customer Reviews
      </h1>

      {/* ====== Reviews Section ====== */}
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <div className="w-[50px] h-[50px] border-4 rounded-full border-t-yellow-400 animate-spin"></div>
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-gray-400 mt-10">No reviews yet. Be the first!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-[100px]">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="relative bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-yellow-400/30 transition-all duration-300"
            >
              {/* Delete icon for own review */}
              {user && (user.email === rev.email || user.role === "admin") && (
                <button
                  onClick={() => handleDelete(rev.email)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                  title="Delete review"
                >
                  <Trash2 size={22} />
                </button>
              )}

              <div className="flex items-center mb-4">
                <img
                  src={rev.profilePic}
                  alt="Profile"
                  className="w-[60px] h-[60px] rounded-full border-4 border-yellow-500 object-cover"
                />
                <div className="ml-4">
                  <div className="text-yellow-400 text-lg">
                    {"⭐".repeat(rev.rating)}
                  </div>
                  <div className="font-semibold text-lg">{rev.name}</div>
                  <div className="text-gray-400 text-sm">
                    {new Date(rev.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 italic">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      )}

      {/* ====== Review Form ====== */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-[600px] flex flex-col items-center mb-[100px]">
        <h2 className="text-yellow-400 text-3xl font-bold mb-4">
          Leave a Review
        </h2>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="w-full h-[120px] p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-yellow-400 focus:outline-none resize-none"
        ></textarea>

        <div className="flex gap-2 mt-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              onClick={() => setRating(num)}
              className={`text-3xl cursor-pointer transition ${
                num <= rating ? "text-yellow-400" : "text-gray-500"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 hover:scale-105 transition-transform duration-300"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}

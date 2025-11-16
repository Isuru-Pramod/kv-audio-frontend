import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { CheckCircle, Trash2 } from "lucide-react";

export default function AdminReviewPage() {
  const [reviews, setReviews] = useState([]);

  // Fetch all reviews (both approved and pending)
  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized. Please log in as admin.");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/reviews", {
          headers: { Authorization: "Bearer " + token },
        });
        setReviews(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load reviews");
      }
    };

    fetchReviews();
  }, []);

  // Approve review
  async function handleApprove(email) {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/api/reviews/approve/${email}`,
        {},
        { headers: { Authorization: "Bearer " + token } }
      );
      toast.success("Review approved successfully!");
      setReviews((prev) =>
        prev.map((r) =>
          r.email === email ? { ...r, isApproved: true } : r
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve review");
    }
  }

  // Delete review
  async function handleDelete(email) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized. Please log in as admin.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/reviews/${email}`, {
        headers: { Authorization: "Bearer " + token },
      });
      toast.success("Review deleted successfully!");
      setReviews((prev) => prev.filter((r) => r.email !== email));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete review");
    }
  }

  const pendingReviews = reviews.filter((r) => !r.isApproved);
  const approvedReviews = reviews.filter((r) => r.isApproved);

  return (
    <div className="min-h-screen text-white p-10">
      <h1 className="text-3xl font-bold text-center text-blue-400 mb-10">
        Admin Review Management
      </h1>

      {/* Pending Reviews */}
      <section>
        <h2 className="text-yellow-400 text-2xl font-semibold mb-5">
          Pending Reviews
        </h2>
        <div className="flex flex-wrap gap-6">
          {pendingReviews.length === 0 ? (
            <p className="text-gray-400">No pending reviews.</p>
          ) : (
            pendingReviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#1c1f26] p-6 rounded-2xl shadow-lg w-[320px] flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {review.name || "Anonymous"}
                  </h3>
                  <p className="text-gray-300 mb-3 italic">
                    "{review.comment || "No comment provided"}"
                  </p>
                  <p className="text-sm text-yellow-400 mb-4">
                    ⭐ Rating: {review.rating}
                  </p>
                </div>

                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => handleApprove(review.email)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-all"
                  >
                    <CheckCircle size={18} /> Approve
                  </button>
                  <button
                    onClick={() => handleDelete(review.email)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-all"
                  >
                    <Trash2 size={18} /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Approved Reviews */}
      <section className="mt-14">
        <h2 className="text-green-400 text-2xl font-semibold mb-5">
          Approved Reviews
        </h2>
        <div className="flex flex-wrap gap-6">
          {approvedReviews.length === 0 ? (
            <p className="text-gray-400">No approved reviews yet.</p>
          ) : (
            approvedReviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#1c1f26] p-6 rounded-2xl shadow-lg w-[320px] flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {review.name || "Anonymous"}
                  </h3>
                  <p className="text-gray-300 mb-3 italic">
                    "{review.comment || "No comment provided"}"
                  </p>
                  <p className="text-sm text-yellow-400 mb-4">
                    ⭐ Rating: {review.rating}
                  </p>
                </div>

                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => handleDelete(review.email)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-all"
                  >
                    <Trash2 size={18} /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

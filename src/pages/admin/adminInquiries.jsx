import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminInquiries() {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [replyText, setReplyText] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:5000/api/inquiries", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setInquiries(res.data);
        } catch (err) {
            console.error(err);
            toast.error("❌ Failed to load inquiries");
        } finally {
            setLoading(false);
        }
    };

    const handleReplyChange = (id, value) => {
        setReplyText({ ...replyText, [id]: value });
    };

    const sendReply = async (id) => {
        const reply = replyText[id];
        if (!reply || reply.trim() === "") {
            toast.warning("⚠️ Please enter a reply first.");
            return;
        }

        try {
            await axios.put(
                `http://localhost:5000/api/inquiries/${id}`,
                { reply },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("✅ Reply sent successfully!");
            setReplyText({ ...replyText, [id]: "" });
            fetchInquiries();
        } catch (err) {
            console.error(err);
            toast.error("❌ Failed to send reply");
        }
    };

    const deleteInquiry = async (id) => {
        if (!window.confirm("Are you sure you want to delete this inquiry?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/inquiries/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("🗑️ Inquiry deleted successfully");
            setInquiries(inquiries.filter((inq) => inq.id !== id));
        } catch (err) {
            console.error(err);
            toast.error("❌ Failed to delete inquiry");
        }
    };

    if (loading)
        return (
		<div className="flex justify-center items-center h-[300px]">
			<div className="border-4 border-gray-700 border-t-blue-500 rounded-full w-20 h-20 animate-spin"></div>
		</div>
        );

    return (
        <div className="min-h-screen text-gray-100 p-6">
            <ToastContainer position="bottom-right" theme="dark" />
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">
                Admin Inquiries
            </h1>

            {inquiries.length === 0 ? (
                <p className="text-center text-gray-400">No inquiries found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {inquiries.map((inq) => (
                        <div
                            key={inq.id}
                            className="bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300"
                        >
                            <div className="mb-2">
                                <p className="text-sm text-gray-400">ID: {inq.id}</p>
                                <p className="font-semibold text-blue-300">{inq.email}</p>
                                <p className="text-gray-400">{inq.phone}</p>
                            </div>

                            <p className="text-gray-200 mt-3 mb-4 border-l-4 border-blue-400 pl-3 italic">
                                {inq.message}
                            </p>

                            {inq.reply && inq.reply.trim() !== "" ? (
                                <div className="bg-green-900/40 p-3 rounded-lg border border-green-700">
                                    <p className="text-green-300 font-medium">{inq.reply}</p>
                                    {inq.repliedAt && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(inq.repliedAt).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <textarea
                                        className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-lg p-2 text-sm resize-none focus:ring-2 focus:ring-blue-500"
                                        rows="2"
                                        placeholder="Write a reply..."
                                        value={replyText[inq.id] || ""}
                                        onChange={(e) =>
                                            handleReplyChange(inq.id, e.target.value)
                                        }
                                    />
                                    <button
                                        onClick={() => sendReply(inq.id)}
                                        className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                                    >
                                        Send Reply
                                    </button>
                                </div>
                            )}

                            <button
                                onClick={() => deleteInquiry(inq.id)}
                                className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                            >
                                Delete Inquiry
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

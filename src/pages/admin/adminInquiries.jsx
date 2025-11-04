import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminInquiries() {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [replyText, setReplyText] = useState({}); // track replies by inquiry ID
    const token = localStorage.getItem("token"); // admin JWT

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
            alert("Failed to load inquiries");
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
            alert("Please enter a reply first.");
            return;
        }

        try {
            await axios.put(
                `http://localhost:5000/api/inquiries/${id}`,
                { reply },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Reply sent successfully!");
            setReplyText({ ...replyText, [id]: "" });
            fetchInquiries();
        } catch (err) {
            console.error(err);
            alert("Failed to send reply");
        }
    };

    const deleteInquiry = async (id) => {
        if (!window.confirm("Are you sure you want to delete this inquiry?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/inquiries/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Inquiry deleted successfully");
            setInquiries(inquiries.filter((inq) => inq.id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete inquiry");
        }
    };

    if (loading) return <div className="border-4 my-4 border-b-green-500 rounded-full w-[100px] h-[100px] animate-spin"></div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
                Admin Inquiries
            </h1>

            {inquiries.length === 0 ? (
                <p className="text-center text-gray-500">No inquiries found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border">ID</th>
                                <th className="px-4 py-2 border">Email</th>
                                <th className="px-4 py-2 border">Phone</th>
                                <th className="px-4 py-2 border">Message</th>
                                <th className="px-4 py-2 border">Reply</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries.map((inq) => (
                                <tr key={inq.id} className="border-t">
                                    <td className="px-4 py-2 border text-center">{inq.id}</td>
                                    <td className="px-4 py-2 border">{inq.email}</td>
                                    <td className="px-4 py-2 border">{inq.phone}</td>
                                    <td className="px-4 py-2 border">{inq.message}</td>
                                    <td className="px-4 py-2 border">
                                        {inq.reply && inq.reply.trim() !== "" ? (
                                            <div>
                                                <p className="text-green-700 font-medium">{inq.reply}</p>
                                                {inq.repliedAt && (
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(inq.repliedAt).toLocaleString()}
                                                    </p>
                                                )}
                                            </div>
                                        ) : (
                                            <div>
                                                <textarea
                                                    className="w-full border rounded p-1 text-sm"
                                                    rows="2"
                                                    placeholder="Write a reply..."
                                                    value={replyText[inq.id] || ""}
                                                    onChange={(e) =>
                                                        handleReplyChange(inq.id, e.target.value)
                                                    }
                                                />
                                                <button
                                                    onClick={() => sendReply(inq.id)}
                                                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    Send Reply
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        <button
                                            onClick={() => deleteInquiry(inq.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

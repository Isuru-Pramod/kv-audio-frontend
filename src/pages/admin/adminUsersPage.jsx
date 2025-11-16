import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/users/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      fetchUsers();
    }
  }, [loading]);

  async function handleBlockUser(email, isBlocked) {
    const confirmAction = window.confirm(
      `Are you sure you want to ${isBlocked ? "unblock" : "block"} this user?`
    );
    if (!confirmAction) return;

    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/api/users/block/${email}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(
        `User has been ${isBlocked ? "unblocked" : "blocked"} successfully`
      );
      setLoading(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user status");
    }
  }

  return (
    <div className="min-h-screen w-full text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-400 text-center">
        Manage Users
      </h1>

      {loading ? (
		<div className="flex justify-center items-center h-[300px]">
			<div className="border-4 border-gray-700 border-t-blue-500 rounded-full w-20 h-20 animate-spin"></div>
		</div>
      ) : users.length === 0 ? (
        <p className="text-gray-400">No users found.</p>
      ) : (
        <div className="w-full max-w-6xl bg-gray-800 rounded-2xl shadow-lg p-4">
          {/* ------------------------ */}
          {/* TABLE FOR MD+ SCREENS */}
          {/* ------------------------ */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-700 text-blue-300 uppercase text-sm">
                  <th className="p-3 text-left">Profile</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Address</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="p-3">
                      <img
                        src={user.profilePicture || "https://picsum.photos/50"}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border border-gray-600 object-cover"
                      />
                    </td>
                    <td className="p-3 font-medium text-gray-200">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="p-3 text-gray-300">{user.email}</td>
                    <td className="p-3 capitalize text-gray-300">
                      {user.role}
                    </td>
                    <td className="p-3 text-gray-300">
                      {user.phone || user.phoneNumber || "—"}
                    </td>
                    <td className="p-3 text-gray-300">{user.address || "—"}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          user.isBlocked
                            ? "bg-red-600 text-white"
                            : "bg-green-600 text-white"
                        }`}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleBlockUser(user.email, user.isBlocked)}
                        className={`px-4 py-2 rounded-lg text-white font-semibold transition duration-300 ${
                          user.isBlocked
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ------------------------ */}
          {/* MOBILE CARD VIEW */}
          {/* ------------------------ */}
          <div className="md:hidden flex flex-col gap-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-gray-700 p-4 rounded-xl border border-gray-600"
              >
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={user.profilePicture || "https://via.placeholder.com/50"}
                    alt="profile"
                    className="w-14 h-14 rounded-full object-cover border border-gray-500"
                  />

                  <div>
                    <p className="text-lg font-semibold text-white">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-gray-300 text-sm">{user.email}</p>
                  </div>
                </div>

                <div className="text-gray-300 text-sm space-y-1">
                  <p>
                    <span className="font-semibold text-gray-200">Role:</span>{" "}
                    {user.role}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-200">Phone:</span>{" "}
                    {user.phone || user.phoneNumber || "—"}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-200">Address:</span>{" "}
                    {user.address || "—"}
                  </p>

                  <p className="mt-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.isBlocked
                          ? "bg-red-600 text-white"
                          : "bg-green-600 text-white"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => handleBlockUser(user.email, user.isBlocked)}
                  className={`w-full mt-4 py-2 rounded-lg text-white font-semibold transition duration-300 ${
                    user.isBlocked
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {user.isBlocked ? "Unblock User" : "Block User"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  function handleOnSubmit(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/users/`, {
        firstName,
        lastName,
        email,
        password,
        address,
        phone,
      })
      .then(() => {
        toast.success("Registration successful");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "An error occurred");
      });
  }

  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] w-full min-h-screen flex justify-center items-center relative overflow-hidden px-4">

      {/* Animated light blobs for ambience */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500 opacity-20 rounded-full blur-3xl animate-pulse delay-500"></div>

      <form onSubmit={handleOnSubmit} className="relative z-10 w-full max-w-[450px]">
        <div className="w-full bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl flex flex-col justify-center items-center px-6 sm:px-10 py-10 transition-all duration-500 hover:scale-[1.02]">

          {/* Logo */}
          <img src="/images-removebg-preview.png" alt="logo" className="w-[150px] h-[150px] object-contain mb-5 drop-shadow-lg" />

          {/* Title */}
          <h2 className="text-white text-2xl sm:text-3xl font-semibold mb-6 tracking-wide text-center">
            Create an Account
          </h2>

          {/* Input Fields */}
          <div className="flex flex-col w-full space-y-5">
            <input
              type="text"
              placeholder="First Name"
              className="input-modern"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input-modern"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="input-modern"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input-modern"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              className="input-modern"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone"
              className="input-modern"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full h-[50px] bg-gradient-to-r from-yellow-500 to-amber-700 text-white text-lg sm:text-xl font-bold rounded-lg mt-8 shadow-lg hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-300"
          >
            Register
          </button>

          {/* Already have an account */}
          <p className="text-white text-sm sm:text-base mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

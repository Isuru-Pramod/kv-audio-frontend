import { useState } from "react";
import "./login.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {

  {/* Accounts and passwords
  
Admin@gmail.com
123

cos2@gmail.com
123

cos@gmail.com
123
  */}

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
      const googleLogin = useGoogleLogin(
    {
      onSuccess : (res)=>{
        console.log(res)
        axios.post(`http://localhost:5000/api/users/google`,{
          accessToken : res.access_token
        }).then((res)=>{
          console.log(res)
          toast.success("Login Success")
          const user = res.data.user
          localStorage.setItem("token",res.data.token)
          if(user.role === "admin"){
            navigate("/admin/")
          }else{
            navigate("/")
          }
        }).catch((err)=>{
          console.log(err)
        })
      }
    }
  )


    function handleOnSubmit(e){ 
        e.preventDefault()
        console.log(email, password);
        const backendUrl = import.meta.env.VITE_BACKEND_URL

        axios.post(`http://localhost:5000/api/users/login`, {
            email: email,
            password: password  
        }).then((res)=>{

            console.log(res);
            toast.success("Login successfull");
            const user = res.data.user;
            localStorage.setItem("token", res.data.token);

        if(user.emailVerified == false){
        navigate("/verify-email")
        return
      }

            if(user.role ==="admin"){
                navigate("/admin/orders");
            }else{
                navigate("/");
            }

        }).catch((err)=>{
            console.log(err);
            toast.error(err?.response?.data?.message||"Error");
        })
    }

    return(
    <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] w-full min-h-screen flex justify-center items-center relative overflow-hidden px-4">

      {/* Animated floating blobs for aesthetic background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-600 opacity-20 rounded-full blur-3xl animate-pulse delay-500"></div>

      <form onSubmit={handleOnSubmit} className="relative z-10 w-full max-w-[420px]">
        <div className="w-full bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl flex flex-col justify-center items-center px-6 sm:px-8 py-10 transition-all duration-500 hover:scale-[1.02]">

          {/* Logo */}
          <img 
            src="/images-removebg-preview.png" 
            alt="logo" 
            className="w-[150px] h-[150px] object-contain mb-5 drop-shadow-lg" 
          />

          {/* Title */}
          <h2 className="text-white text-2xl sm:text-3xl font-semibold mb-6 tracking-wide text-center">
            Welcome Back
          </h2>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full h-[45px] bg-transparent border-b border-white/60 text-white text-base sm:text-lg placeholder-white/60 outline-none focus:border-yellow-400 transition-all duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full h-[45px] bg-transparent border-b border-white/60 text-white text-base sm:text-lg placeholder-white/60 outline-none mt-5 focus:border-yellow-400 transition-all duration-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-[50px] bg-gradient-to-r from-yellow-500 to-amber-700 text-white text-lg sm:text-xl font-bold rounded-lg mt-8 shadow-lg hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-300"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center w-full my-4 sm:my-5">
            <div className="flex-1 h-px bg-white/30"></div>
            <span className="px-3 text-white/70 text-sm">OR</span>
            <div className="flex-1 h-px bg-white/30"></div>
          </div>

          {/* Google Login */}
          <div
            onClick={googleLogin}
            className="w-full h-[50px] flex justify-center items-center bg-white/20 hover:bg-white/30 text-white text-base sm:text-lg font-semibold rounded-lg cursor-pointer shadow-lg transition-all duration-300"
          >
            <img src="/google-icon.png" alt="Google" className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
            Login with Google
          </div>

          {/* Register Link */}
          <p className="text-white text-sm sm:text-base mt-8 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-yellow-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>


    )
}
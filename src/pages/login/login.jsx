import { useState } from "react";
import "./login.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


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

            if(user.role ==="admin"){
                navigate("/admin");
            }else{
                navigate("/");
            }

        }).catch((err)=>{
            console.log(err);
            toast.error(err?.response?.data?.message|| "Error");
        })
    }

    return(
    <div className="bg-pic w-full h-screen flex justify-center items-center">
        <form onSubmit={handleOnSubmit}>
        <div className="w-[400px] h-[250px] backdrop-blur-2xl rounded-2xl flex flex-col justify-center items-center relative">
            <img src="/images-removebg-preview.png" alt="logo" className="w-[100px] h-[100px] object-cover"/>

            <input type="email"   
            placeholder="Email"
            className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none "
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            />

            <input type="password"   
            placeholder="Password"
            className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-5"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            />

            <button className="w-[300px] h-[50px] bg-yellow-400 text-white text-2xl font-bold rounded-lg my-8">Login</button>


        </div>
        </form>
            
    </div>
    )
}
import { useState } from "react";
import "./login.css";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function login(){
        console.log("click");}

    return(
    <div className="bg-pic w-full h-screen flex justify-center items-center">
        <div className="w-[400px] h-[400px] backdrop-blur-2xl rounded-2xl flex flex-col justify-center items-center relative">
            <img src="/images-removebg-preview.png" alt="logo" className="w-[100px] h-[100px] object-cover"/>

            <input type="email"   
            placeholder="Email"
            className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none "
            />

            <input type="password"   
            placeholder="Password"
            className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-5"
            />

            <button className="w-[300px] h-[50px] bg-yellow-400 text-white text-2xl font-bold rounded-lg my-8" onClick={login}>Login</button>


        </div>
            
    </div>
    )
}
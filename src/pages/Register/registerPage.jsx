import { useState } from "react";
import "./registerPage.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
        console.log({ firstName, lastName, email, password, address, phone });
        axios.post(`http://localhost:5000/api/users/`, 
            { 
                email : email,
                firstName : firstName,
                lastName : lastName ,
                password : password, 
                address : address,
                phone : phone 
            }).then((res) => {
            toast.success("Registration successfull");
            navigate("/login");
        }).catch((err) => {
            toast.error(err?.response?.data?.message||"An error occured");
        })
    };

    return (
        <div className="bg-pic h-screen flex justify-center items-center">
            <form onSubmit={handleOnSubmit}>
                <div className="w-[400px] p-6 backdrop-blur-2xl rounded-2xl shadow-2xl flex flex-col justify-center items-center">
                    <img src="/images-removebg-preview.png" alt="logo" className="w-[100px] h-[100px] object-cover" />
                    
                    <input type="text" placeholder="First Name" className="input-field" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" placeholder="Last Name" className="input-field" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input type="email" placeholder="Email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="text" placeholder="Address" className="input-field" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <input type="text" placeholder="Phone" className="input-field" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    
                    <button className="w-[300px] h-[50px] bg-yellow-400 text-white text-2xl font-bold rounded-lg mt-5">Register</button>
                </div>
            </form>
        </div>
    );
}
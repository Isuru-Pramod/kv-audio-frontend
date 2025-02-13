import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import Contact from "./contact";
import Gallery from "./gallery";
import Items from "./Items";
import Home from "./home";
import ErrorNotfound from "./error";

export default function HomePage(){
    return(
        <>
            <Header/>
            <div className="h-[calc(100vh-100px)] w-full bg-blue-300">

                <Routes path="/*">
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/hallery" element={<Gallery/>}/>
                    <Route path="/items" element={<Items/>}/>
                    <Route path="/gallery" element={<Gallery/>}/>
                    <Route path="/" element={<Home/>}/>

                    <Route path="/*" element={<ErrorNotfound/>}/>
                </Routes>
            </div>
        </>
    )
} 
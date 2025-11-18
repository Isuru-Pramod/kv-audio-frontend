import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import Contact from "./contact";
import Gallery from "./gallery";
import Items from "./Items";
import Home from "./home";
import ErrorNotfound from "./error";
import ProductOverview from "./productOverview";
import BookingPage from "./bookingPage";
import Reviws from "./reviews";
import MyOders from "./MyOders";

export default function HomePage(){
    return(
        <>
            <Header/>
            <div className="h-[calc(100vh-100px)] w-full flex">

                <Routes path="/*">
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/Booking" element={<BookingPage/>}/>
                    <Route path="/hallery" element={<Gallery/>}/>
                    <Route path="/items" element={<Items/>}/>
                    <Route path="/gallery" element={<Gallery/>}/>
                    <Route path="/reviws" element={<Reviws/>}/>
                    <Route path="/myOders" element={<MyOders/>}/>
                    <Route path="/product/:key" element={<ProductOverview/>}/>
                    <Route path="/" element={<Home/>}/>

                    <Route path="/*" element={<ErrorNotfound/>}/>
                </Routes>
            </div>
        </>
    )
} 
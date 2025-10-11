import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { Link, Route, Routes } from "react-router-dom";
import AdminItemsPage from "./adminItemspage";
import ProductAddingPage from "./addProductPage";
import UpdateItemspage from "./updateItemspage";
import AdminUsersPage from "./adminUsersPage";
import AdminOrdersPage from "./adminBookingPage";

export default function AdminPage(){
    return(
        <div className="w-full h-screen flex">
            <div className="w-[200px] h-full bg-green-200">
                <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
                    <BsGraphDown/>
                    Dashboard
                </button>
                <Link to="/admin/orders" className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
                    <FaRegBookmark/>
                    Orders
                </Link>
                <Link to="/admin/items" className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
                    <MdOutlineSpeaker/>
                    Items
                </Link>
                <Link to="/admin/users" className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
                    <FaRegUser/>
                    User
                </Link>
            </div>
            <div className="w-[calc(100vw-200px)] ">
                <Routes path="/*">
                    <Route path="/orders" element={<AdminOrdersPage/>}/>
                    <Route path="/users" element={<AdminUsersPage/>}/>
                    <Route path="/items" element={<AdminItemsPage/>}/>
                    <Route path="/items/add" element={<ProductAddingPage/>}/>
                    <Route path="/items/edit/" element={<UpdateItemspage/>}/>
                </Routes>
            </div>
        </div>
    )
}
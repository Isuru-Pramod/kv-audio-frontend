import axios from "axios";
import { useEffect, useState } from "react";
import { LuCirclePlus } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

export default function AdminItemsPage() {
    const [items, setItems] = useState([]);
    const [itemsLoaded, setItemsLoaded] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {

        if (!itemsLoaded) {
            const token = localStorage.getItem("token");
            axios.get("http://localhost:3000/api/products", {
                headers: {
                    Authorization: "Bearer " + token,
                }
            }).then((res) => {
                console.log(res.data);
                setItems(res.data);
                setItemsLoaded(true);
            }).catch((err) => {
                console.error(err);
            })
        }
        ;
    }, [itemsLoaded]); // if "itemsLoaded" is changed, this useEffect will run

    const handleDelete = (key) => {
        
        if (window.confirm("Are you sure you want to delete this item?")) {
            const token = localStorage.getItem("token");
            axios.delete(`http://localhost:3000/api/products/${key}`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            }).then((res) => {
                console.log(res.data);
                setItemsLoaded(false);
            }).catch((err) => {
                console.log(err);
            })
        }

    };

    return (
        <div className="w-full h-full p-4 bg-gray-100 flex flex-col items-center">
            {!itemsLoaded && <div className="border-4 my-4 border-b-green-500 rounded-full w-[100px] h-[100px] animate-spin"></div>} {/*if itemsLoaded is false, show the spinner*/}
            {itemsLoaded && <div className="overflow-x-auto bg-white shadow-lg rounded- p-4">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="bg-gray-800 text-white uppercase text-sm">
                            <th className="p-3">Key</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Dimensions</th>
                            <th className="p-3">Availability</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((product) => (
                            <tr key={product.key} className="border-b hover:bg-gray-50">
                                <td className="p-3">{product.key}</td>
                                <td className="p-3">{product.name}</td>
                                <td className="p-3">${product.price.toFixed(2)}</td>
                                <td className="p-3">{product.category}</td>
                                <td className="p-3">{product.dimensions}</td>
                                <td className={`p-3 font-bold ${product.availability ? 'text-green-600' : 'text-red-600'}`}>
                                    {product.availability ? "Available" : "Not Available"}
                                </td>
                                <td className="p-3 flex gap-2 justify-center">
                                    <button onClick={() => {navigate(`/admin/items/edit`, {state:{product}})}} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">Edit</button>
                                    <button onClick={() => handleDelete(product.key)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}

            <Link to="/admin/items/add" className="fixed bottom-6 right-6">
                <LuCirclePlus className="text-red-600 text-[70px] hover:text-red-800 transition duration-300" />
            </Link>
        </div>
    );
}
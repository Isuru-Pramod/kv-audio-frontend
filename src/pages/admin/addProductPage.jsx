import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function ProductAddingPage() {

    const [productKay, setProductKay] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productCategory, setProductCategory] = useState("");
    const [productDimensions, setProductDimensions] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const navigate = useNavigate();

    async function handleAddItem() {
        console.log(productKay, productName, productPrice, productCategory, productDimensions, productDescription);

        const token = localStorage.getItem("token");
        if (token) {
            try {


                const result = await axios.post(`http://localhost:5000/api/products`, {
                    key : productKay,
                    name : productName,
                    price : productPrice,
                    category : productCategory,
                    dimensions : productDimensions,
                    description : productDescription
                }, {
                    headers : {
                        Authorization: "Bearer " + token,
                    },
                }
                );
                toast.success(result.data.message);
                navigate("/admin/items");


            } catch (error) {
                toast.error(error.response.data.message);
                
            }
        } else {
            toast.error("you are not authorized to add items");
        }


        if (!token) //token == null
        {
            toast.error("Please login first");
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center">
            <h1 className = "text-lg font-bold mb-4">Add Items</h1>
            <div className="w-[400px] border flex flex-col">
                <input
                    onChange={(e) => setProductKay(e.target.value)}
                    type="text"
                    placeholder=" product kay"
                    value={productKay}
                    className="w-full p-2 border rounded"
                />
                <input
                    onChange={(e) => setProductName(e.target.value)}
                    type="text"
                    placeholder=" product Name"
                    value={productName}
                    className="w-full p-2 border rounded"
                />
                <input
                    onChange={(e) => setProductPrice(e.target.value)}
                    type="number"
                    placeholder=" product price"
                    value={productPrice}
                    className="w-full p-2 border rounded"
                />
                <select
                    className="w-full p-2 border rounded"
                    onChange={(e) => setProductCategory(e.target.value)}
                    value={productCategory}>

                    <option Key="chooseCategory">choose category </option>
                    <option Key="Audio">Audio </option>
                    <option Key="Light">Light</option>
                </select>
                <input
                    onChange={(e) => setProductDimensions(e.target.value)}
                    type="text"
                    placeholder=" product Dimensions"
                    value={productDimensions}
                    className="w-full p-2 border rounded"
                />
                <textarea
                    onChange={(e) => setProductDescription(e.target.value)}
                    type="text"
                    placeholder=" product Description"
                    value={productDescription}
                    className="w-full p-2 border rounded"
                />

                <button onClick={handleAddItem} className="border w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add</button>
                <button onClick={() => navigate("/admin/items")} className="border w-full p-2 bg-red-500 text-white rounded hover:bg-red-600">Cancel</button>
            </div>
        </div>
    )
}
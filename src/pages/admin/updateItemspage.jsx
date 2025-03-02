import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";


export default function UpdateItemspage() {
    const location = useLocation();
    console.log(location);

    const [productKay, setProductKay] = useState(location.state.product.key);
    const [productName, setProductName] = useState(location.state.product.name);
    const [productPrice, setProductPrice] = useState(location.state.product.price);
    const [productCategory, setProductCategory] = useState(location.state.product.category);
    const [productDimensions, setProductDimensions] = useState(location.state.product.dimensions);
    const [productDescription, setProductDescription] = useState(location.state.product.description);
    const navigate = useNavigate();


    async function handleAddItem() {
        console.log(productKay, productName, productPrice, productCategory, productDimensions, productDescription);

        const token = localStorage.getItem("token");
        if (token) {
            try {


                const result = await axios.put("http://localhost:3000/api/products/"+productKay, {
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
            <h1 className = "text-lg font-bold mb-4">UpdateItems Items</h1>
            <div className="w-[400px] border flex flex-col">
                <input
                    disabled   // for can't change the value
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

                <button onClick={handleAddItem} className="border w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Update</button>
                <button onClick={() => navigate("/admin/items")} className="border w-full p-2 bg-red-500 text-white rounded hover:bg-red-600">Cancel</button>
            </div>
        </div>
    )
}
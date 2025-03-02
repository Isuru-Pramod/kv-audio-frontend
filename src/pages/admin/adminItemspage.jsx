
const testArr = [{
    "key": "DH001",
    "name": "Adjustable Dog Harness",
    "price": 25.99,
    "category": "Harnesses",
    "dimensions": "M - 18-24 inches",
    "description": "Durable and comfortable adjustable dog harness with reflective strips for safety.",
    "availability": true,
    "img": [
        "https://example.com/dog-harness.jpg"
    ]
}, {
    "key": "CS002",
    "name": "Cat Scratching Post",
    "price": 39.99,
    "category": "Cages & Beds",
    "dimensions": "24x12 inches",
    "description": "Sturdy and durable scratching post to keep your cat entertained and protect your furniture.",
    "availability": true,
    "img": [
        "https://example.com/cat-scratching-post.jpg"
    ]
},{
    "key": "BC003",
    "name": "Large Bird Cage",
    "price": 59.99,
    "category": "Cages & Beds",
    "dimensions": "30x18x36 inches",
    "description": "Spacious bird cage with multiple perches and a removable tray for easy cleaning.",
    "availability": false,
    "img": [
        "https://example.com/bird-cage.jpg"
    ]
},{
    "key": "DT004",
    "name": "Rubber Dog Chew Toy",
    "price": 9.99,
    "category": "Pet Toys",
    "dimensions": "5 inches",
    "description": "Safe and durable chew toy designed to keep dogs engaged and help with dental health.",
    "availability": true,
    "img": [
        "https://example.com/dog-chew-toy.jpg"
    ]
},{
    "key": "CG005",
    "name": "Self-Cleaning Cat Grooming Brush",
    "price": 15.99,
    "category": "Grooming Products",
    "dimensions": "6 inches",
    "description": "Gentle and effective grooming brush with retractable bristles for easy cleaning.",
    "availability": true,
    "img": [
        "https://example.com/cat-grooming-brush.jpg"
    ]
}]





import { useState } from "react";
import { LuCirclePlus } from "react-icons/lu";
import { Link } from "react-router-dom";


export default function AdminItemsPage() {
    const [items, setItems] = useState(testArr);


    return (
        <div className="w-full h-full relative">
            <table>
                <thead>
                    <th>key</th>
                    <th>name</th>
                    <th>price</th>
                    <th>category</th>
                    <th>dimensions</th>
                    <th>availability</th>
                </thead>
                <tbody>
                    {
                        items.map((product) => {
                            return (
                                <tr key = {product.key}>
                                    <td>{product.key}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.dimensions}</td>
                                    <td>{product.availability ? "Available" : "Not Available"}</td>
                                </tr>
                            )
                        })
                    }


                </tbody>
            </table>
        <Link to="/admin/items/add">
            <LuCirclePlus className="text-[70px] absolute right-4 bottom-4 hover:text-red-900"/>
        </Link>
        </div>
    )
}
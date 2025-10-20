import axios from "axios";
import { useEffect, useState } from "react";
import { addToCart, removeFromCart } from "../utils/cart";
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa";

export default function BookingItem({ itemKey, qty, refresh }) {
	const [item, setItem] = useState(null);
	const [status, setStatus] = useState("loading"); // loading, success, error

	useEffect(() => {
		if (status === "loading") {
			axios
				.get(`http://localhost:5000/api/products/${itemKey}`)
				.then((res) => {
					setItem(res.data);
					setStatus("success");
				})
				.catch((err) => {
					console.error(err);
					setStatus("error");
					removeFromCart(itemKey);
					refresh();
				});
		}
	}, [status]);

	if (status === "loading") {
		return <div className="text-accent">Loading...</div>;
	}

	if (status === "error") {
		return <div className="text-red-500">Failed to load product.</div>;
	}

	return (
		<div className="flex w-[600px] my-2 items-center gap-4 p-4 bg-st shadow-md rounded-lg border border-secondary relative">
            <div className="absolute right-[-45px]  text-red-500 hover:text-white hover:bg-red-500 p-[10px] rounded-full  cursor-pointer">
            <FaTrash onClick={() => {
                removeFromCart(itemKey);
                refresh();
            }
            }/>
            </div>
			{/* Product Image */}
			<img
				src={item.img[0]}
				alt={item.name}
				className="w-20 h-20 object-cover rounded-lg border border-secondary"
			/>

			{/* Product Details */}
			<div className="flex flex-row items-center relative  w-full">
				<h3 className="text-lg font-semibold text-gray-200">{item.name}</h3>
				<div className="flex absolute right-0 gap-4">
					<p className="font-medium text-gray-200 w-[70px] text-center">
						{item.price.toFixed(2)}
					</p>
					<p className=" font-medium w-[40px] text-center text-gray-200 relative flex justify-center items-center">
						<button
							className="absolute top-[-20px] hover:text-gray-200"
							onClick={() => {
								addToCart(itemKey, 1);
								refresh();
							}}
						>
							<FaArrowUp 
							className="text-yellow-600" />
						</button>
						{qty}
						<button
							className="absolute bottom-[-20px] hover:text-gray-200"
							onClick={() => {
								if (qty == 1) {
									removeFromCart(itemKey);
									refresh();
								} else {
									addToCart(itemKey, -1);
									refresh();
								}
							}}
						>
							<FaArrowDown className="text-yellow-600" />
						</button>
					</p>
					<p className="text-lg font-semibold text-yellow-500">
						{(item.price * qty).toFixed(2)}
					</p>
				</div>
			</div>
		</div>
	);
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../asserts/style/OrderDetails.css";
import { fetchOrderById } from "../../services/api"; // Assume this is the API call function
import { toast } from "react-toastify";

function OrderDetails() {
	const { id } = useParams();
	const [order, setOrder] = useState(null); // State to store the fetched order

	useEffect(() => {
		const getOrderDetails = async () => {
			try {
				const response = await fetchOrderById(id); // Fetch order details from the API
				setOrder(response.data);
			} catch (error) {
				console.error("Error fetching order details:", error);
				toast.error("Failed to fetch order details");
			}
		};

		getOrderDetails();
	}, [id]);

	if (!order) {
		return <p>Order not found!</p>;
	}

	return (
		<div className="order-details">
			<h2>Order ID: {order.order_id}</h2>
			<p>
				<strong>Customer Name:</strong>{" "}
				{order.user_details.first_name + " " + order.user_details.last_name}
			</p>
			<p>
				<strong>Total Amount:</strong> {order.total_price}
			</p>
			<p>
				<strong>Status:</strong> {order.order_status}
			</p>
			<p>
				<strong>Date:</strong> {order.created_at}
			</p>
			<p>
				<strong>Items:</strong>{" "}
				{order.cart_items.map((e) => e.product_details.product_name + ", ")}
			</p>
		</div>
	);
}

export default OrderDetails;

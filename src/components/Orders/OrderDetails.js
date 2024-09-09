import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../asserts/style/Order/OrderDetails.css";
import { fetchOrderById } from "../../services/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OrderDetails() {
	const { id } = useParams(); // Get the order ID from URL parameters
	const [order, setOrder] = useState(null); // State to store order details
	const [loading, setLoading] = useState(true); // State to manage loading status
	const [error, setError] = useState(null); // State to manage error messages

	useEffect(() => {
		const getOrderDetails = async () => {
			try {
				const response = await fetchOrderById(id); // Fetch order details by ID
				setOrder(response.data); // Update order state with fetched data
			} catch (error) {
				setError(error.message || "Failed to fetch order details"); // Update error state and show toast error
				toast.error(error.message || "Failed to fetch order details");
			} finally {
				setLoading(false); // Set loading to false once data is fetched or an error occurs
			}
		};

		getOrderDetails(); // Fetch order details on component mount
	}, [id]);

	if (loading) {
		return <div className="loading">Loading...</div>; // Show loading message while fetching data
	}

	if (error) {
		return <div className="error">Error: {error}</div>; // Show error message if there is an error
	}

	if (!order) {
		return <p>Order not found!</p>; // Show message if order is not found
	}

	return (
		<div className="order-details">
			<h2>Order ID: {order.order_id}</h2>
			<p>
				<strong>Customer Name:</strong>{" "}
				{order.user_details.first_name + " " + order.user_details.last_name}
			</p>
			<p>
				<strong>Total Amount:</strong> ₹{order.total_price}
			</p>
			<p>
				<strong>Status:</strong> {order.order_status}
			</p>
			<p>
				<strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}
			</p>
			<p>
				<strong>Items:</strong>{" "}
				{order.cart_items.map((item, index) => (
					<React.Fragment key={index}>
						<Link
							to={`/products/${item.product_details.product_id}`}
							className="edit-link"
						>
							{item.product_details.product_name}
						</Link>
						{index < order.cart_items.length - 1 && ", "}{" "}
						{/* Add comma separator between items */}
					</React.Fragment>
				))}
			</p>
		</div>
	);
}

export default OrderDetails;

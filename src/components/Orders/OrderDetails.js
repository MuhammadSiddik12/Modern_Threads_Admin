import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../asserts/style/Order/OrderDetails.css";
import { fetchOrderById } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OrderDetails() {
	const { id } = useParams();
	const [order, setOrder] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getOrderDetails = async () => {
			try {
				const response = await fetchOrderById(id);
				setOrder(response.data);
			} catch (error) {
				setError(error.message || "Failed to fetch order details");
				toast.error(error.message || "Failed to fetch order details");
			} finally {
				setLoading(false);
			}
		};

		getOrderDetails();
	}, [id]);

	if (loading) {
		return <div className="loading">Loading...</div>;
	}

	if (error) {
		return <div className="error">Error: {error}</div>;
	}

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
						{index < order.cart_items.length - 1 && ", "}
					</React.Fragment>
				))}
			</p>
		</div>
	);
}

export default OrderDetails;

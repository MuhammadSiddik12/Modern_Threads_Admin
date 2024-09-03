import React from "react";
import { useParams } from "react-router-dom";
import "../../asserts/style/OrderDetails.css";

function OrderDetails() {
	const { id } = useParams();

	// Static data for demonstration
	const orders = [
		{
			id: 101,
			customer: "John Doe",
			amount: "$250",
			status: "Shipped",
			date: "2024-09-01",
			items: ["Item1", "Item2"],
		},
		{
			id: 102,
			customer: "Jane Smith",
			amount: "$150",
			status: "Processing",
			date: "2024-09-01",
			items: ["Item3"],
		},
	];

	const order = orders.find((o) => o.id === parseInt(id));

	if (!order) {
		return <p>Order not found!</p>;
	}

	return (
		<div className="order-details">
			<h2>Order ID: {order.id}</h2>
			<p>
				<strong>Customer Name:</strong> {order.customer}
			</p>
			<p>
				<strong>Total Amount:</strong> {order.amount}
			</p>
			<p>
				<strong>Status:</strong> {order.status}
			</p>
			<p>
				<strong>Date:</strong> {order.date}
			</p>
			<p>
				<strong>Items:</strong> {order.items.join(", ")}
			</p>
		</div>
	);
}

export default OrderDetails;

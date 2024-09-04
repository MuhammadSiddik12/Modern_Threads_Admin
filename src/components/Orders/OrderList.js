import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../asserts/style/Orders.css";
import { fetchOrders } from "../../services/api"; // Assume this is the API call function

function Orders() {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const getOrders = async () => {
			try {
				const response = await fetchOrders(); // Fetch orders from the API
				console.log("🚀 ~ getOrders ~ response:", response);
				setOrders(response.data);
			} catch (error) {
				console.error("Error fetching orders:", error);
			}
		};

		getOrders();
	}, []);

	return (
		<div className="orders">
			<h2>Orders</h2>
			<table>
				<thead>
					<tr>
						<th>Order ID</th>
						<th>Cart Items</th>
						<th>Total Amount</th>
						<th>Status</th>
						<th>Date</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr key={order.order_id}>
							<td>{order.order_id}</td>
							<td>{order.total_price}</td>
							<td>{order.order_items}</td>
							<td>{order.order_status}</td>
							<td>{order.created_at}</td>
							<td>
								<Link to={`/orders/${order.order_id}`} className="edit-link">
									View
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Orders;

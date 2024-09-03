import React from "react";
import { Link } from "react-router-dom";
import "../../asserts/style/Orders.css";

function Orders() {
	const orders = [
		{
			id: 101,
			customer: "John Doe",
			amount: "$250",
			status: "Shipped",
			date: "2024-09-01",
		},
		{
			id: 102,
			customer: "Jane Smith",
			amount: "$150",
			status: "Processing",
			date: "2024-09-01",
		},
		// Add more static data here
	];

	return (
		<div className="orders">
			<h2>Orders</h2>
			<table>
				<thead>
					<tr>
						<th>Order ID</th>
						<th>Customer Name</th>
						<th>Total Amount</th>
						<th>Status</th>
						<th>Date</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr key={order.id}>
							<td>{order.id}</td>
							<td>{order.customer}</td>
							<td>{order.amount}</td>
							<td>{order.status}</td>
							<td>{order.date}</td>
							<td>
								<Link to={`/orders/${order.id}`} className="edit-link">
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

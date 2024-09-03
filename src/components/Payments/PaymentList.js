import React from "react";
import { Link } from "react-router-dom";
import "../../asserts/style/Payments.css";

function Payments() {
	const payments = [
		{
			id: 501,
			customer: "John Doe",
			amount: "$250",
			method: "Credit Card",
			status: "Completed",
			date: "2024-09-01",
		},
		{
			id: 502,
			customer: "Jane Smith",
			amount: "$150",
			method: "PayPal",
			status: "Pending",
			date: "2024-09-01",
		},
		// Add more static data here
	];

	return (
		<div className="payments">
			<h2>Payments</h2>
			<table>
				<thead>
					<tr>
						<th>Payment ID</th>
						<th>Customer Name</th>
						<th>Amount</th>
						<th>Method</th>
						<th>Status</th>
						<th>Date</th>
						<th>View Details</th>
					</tr>
				</thead>
				<tbody>
					{payments.map((payment) => (
						<tr key={payment.id}>
							<td>{payment.id}</td>
							<td>{payment.customer}</td>
							<td>{payment.amount}</td>
							<td>{payment.method}</td>
							<td>{payment.status}</td>
							<td>{payment.date}</td>
							<td>
								<Link to={`/payments/${payment.id}`} className="edit-link">
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

export default Payments;

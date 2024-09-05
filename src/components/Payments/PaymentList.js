import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../asserts/style/Payments.css";
import { getPayments } from "../../services/api";
import { toast } from "react-toastify";

function Payments() {
	const [payments, setPayments] = useState([]);

	useEffect(() => {
		const fetchPayments = async () => {
			try {
				const paymentsData = await getPayments();
				setPayments(paymentsData.data);
			} catch (error) {
				toast.error(error);
			}
		};

		fetchPayments();
	}, []);

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
					{payments.length > 0 ? (
						payments.map((payment) => (
							<tr key={payment.payment_id}>
								<td>{payment.payment_id}</td>
								<td>
									{payment.user_details
										? payment.user_details.first_name +
										  " " +
										  payment.user_details.last_name
										: "N/A"}
								</td>
								<td>{payment.amount}</td>
								<td>{payment.payment_method}</td>
								<td>{payment.payment_status}</td>
								<td>{payment.created_at}</td>
								<td>
									<Link
										to={`/payments/${payment.payment_id}`}
										className="edit-link"
									>
										View
									</Link>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="7">No payments found.</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

export default Payments;

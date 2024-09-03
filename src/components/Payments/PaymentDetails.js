import React from "react";
import { useParams } from "react-router-dom";
import "../../asserts/style/PaymentDetails.css";

function PaymentDetails() {
	const { id } = useParams();

	// Static data for demonstration
	const payments = [
		{
			id: 501,
			customer: "John Doe",
			amount: "$250",
			method: "Credit Card",
			status: "Completed",
			date: "2024-09-01",
			details: "Payment for order #12345",
		},
		{
			id: 502,
			customer: "Jane Smith",
			amount: "$150",
			method: "PayPal",
			status: "Pending",
			date: "2024-09-01",
			details: "Payment for order #12346",
		},
	];

	const payment = payments.find((p) => p.id === parseInt(id));

	if (!payment) {
		return <p>Payment not found!</p>;
	}

	return (
		<div className="payment-details">
			<h2>Payment ID: {payment.id}</h2>
			<p>
				<strong>Customer Name:</strong> {payment.customer}
			</p>
			<p>
				<strong>Amount:</strong> {payment.amount}
			</p>
			<p>
				<strong>Method:</strong> {payment.method}
			</p>
			<p>
				<strong>Status:</strong> {payment.status}
			</p>
			<p>
				<strong>Date:</strong> {payment.date}
			</p>
			<p>
				<strong>Details:</strong> {payment.details}
			</p>
		</div>
	);
}

export default PaymentDetails;

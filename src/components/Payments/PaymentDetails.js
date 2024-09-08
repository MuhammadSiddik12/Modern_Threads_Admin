import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../asserts/style/Payment/PaymentDetails.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getPaymentById } from "../../services/ApiService";

function PaymentDetails() {
	const { id } = useParams();
	const [payment, setPayment] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPaymentData = async () => {
			setLoading(true);
			try {
				const response = await getPaymentById(id);
				if (response.data) {
					setPayment(response.data);
				} else {
					toast.error("Payment data not found");
				}
			} catch (error) {
				toast.error(error.message || "Failed to fetch payment details");
			} finally {
				setLoading(false);
			}
		};

		fetchPaymentData();
	}, [id]);

	if (loading) {
		return <div className="loading">Loading...</div>;
	}

	if (!payment) {
		return <p>Payment not found!</p>;
	}

	return (
		<div className="payment-details">
			<h2>Payment ID: {payment.payment_id}</h2>
			<p>
				<strong>Transaction ID:</strong> {payment.transaction_id}
			</p>
			<p>
				<strong>Customer Name:</strong>{" "}
				{payment.user_details
					? `${payment.user_details.first_name} ${payment.user_details.last_name}`
					: "N/A"}
			</p>
			<p>
				<strong>Amount:</strong> ₹{payment.amount.toFixed(2)}
			</p>
			<p>
				<strong>Method:</strong> {payment.payment_method}
			</p>
			<p>
				<strong>Status:</strong> {payment.payment_status}
			</p>
			<p>
				<strong>Date:</strong>{" "}
				{new Date(payment.created_at).toLocaleDateString()}
			</p>
			<p>
				<strong>Order ID:</strong>{" "}
				<Link to={`/orders/${payment.order_id}`} className="edit-link">
					{payment.order_id}
				</Link>
			</p>
		</div>
	);
}

export default PaymentDetails;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../asserts/style/Payment/PaymentDetails.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getPaymentById } from "../../services/api";

function PaymentDetails() {
	const { id } = useParams();
	const [payment, setPayment] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch payment data based on the ID (replace with actual API call)
		// For now, we're using static data for demonstration
		const fetchPaymentData = async () => {
			setLoading(true); // Start loading
			try {
				const data = await getPaymentById(id);

				if (data.data) {
					setPayment(data.data); // Assuming the response structure has a `categories` field
				} else {
					toast.error("Data not found");
				}
			} catch (error) {
				toast.error(error);
			} finally {
				setLoading(false); // Stop loading
			}
		};

		fetchPaymentData();
	}, [id]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!payment) {
		return <p>Payment not found!</p>;
	}

	return (
		<div className="payment-details">
			<h2>Payment ID: {payment.payment_id}</h2>
			<p>
				<strong>Transaction Id:</strong> {payment.transaction_id}
			</p>
			<p>
				<strong>Customer Name:</strong>{" "}
				{payment.user_details
					? payment.user_details.first_name +
					  " " +
					  payment.user_details.last_name
					: "N/A"}
			</p>
			<p>
				<strong>Amount:</strong> {payment.amount}
			</p>
			<p>
				<strong>Method:</strong> {payment.payment_method}
			</p>
			<p>
				<strong>Status:</strong> {payment.payment_status}
			</p>
			<p>
				<strong>Date:</strong> {payment.created_at}
			</p>
			<p>
				<strong>Order Id:</strong>{" "}
				<Link to={`/orders/${payment.order_id}`} className="edit-link">
					{payment.order_id}
				</Link>
			</p>
		</div>
	);
}

export default PaymentDetails;

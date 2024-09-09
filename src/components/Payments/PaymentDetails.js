import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../asserts/style/Payment/PaymentDetails.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getPaymentById } from "../../services/ApiService";

function PaymentDetails() {
	const { id } = useParams(); // Retrieve the payment ID from the route parameters
	const [payment, setPayment] = useState(null); // State to store payment details
	const [loading, setLoading] = useState(true); // State to manage loading status

	useEffect(() => {
		// Function to fetch payment data from the API
		const fetchPaymentData = async () => {
			setLoading(true); // Set loading to true when fetching starts
			try {
				const response = await getPaymentById(id); // Fetch payment data using the provided ID
				if (response.data) {
					setPayment(response.data); // Set payment data if available
				} else {
					toast.error("Payment data not found"); // Show error if no data is returned
				}
			} catch (error) {
				toast.error(error.message || "Failed to fetch payment details"); // Show error if fetching fails
			} finally {
				setLoading(false); // Set loading to false once data is fetched or an error occurs
			}
		};

		fetchPaymentData(); // Call the function to fetch payment data
	}, [id]); // Dependency array ensures the effect runs when the payment ID changes

	if (loading) {
		return <div className="loading">Loading...</div>; // Show loading message while fetching data
	}

	if (!payment) {
		return <p>Payment not found!</p>; // Show message if payment data is not available
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

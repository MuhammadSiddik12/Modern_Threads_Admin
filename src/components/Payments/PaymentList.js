import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../asserts/style/Payment/Payments.css";
import { getPayments } from "../../services/ApiService";
import { toast } from "react-toastify";

function Payments() {
	const [payments, setPayments] = useState([]); // State to store list of payments
	const [searchTerm, setSearchTerm] = useState(""); // State to manage search input
	const [currentPage, setCurrentPage] = useState(1); // State to manage current page
	const [itemsPerPage] = useState(10); // Number of items per page
	const [totalPayments, setTotalPayments] = useState(0); // State to manage total number of payments
	const [loading, setLoading] = useState(false); // State to manage loading status

	// Effect to fetch payments data when search term changes
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			fetchPayments(); // Fetch payments with the current search term
		}, 500); // Debounce delay

		return () => clearTimeout(delayDebounceFn); // Cleanup debounce timer
	}, [searchTerm]);

	// Effect to fetch payments data when current page changes
	useEffect(() => {
		fetchPayments(); // Fetch payments for the current page
	}, [currentPage]);

	// Function to fetch payments data from the API
	const fetchPayments = async () => {
		setLoading(true); // Set loading to true when fetching starts
		try {
			const response = await getPayments(currentPage, itemsPerPage, searchTerm);
			setPayments(response.data); // Update payments state with fetched data
			setTotalPayments(response.total_count); // Update total payments count
		} catch (error) {
			toast.error(error.message || "Failed to fetch payments"); // Show error if fetching fails
		} finally {
			setLoading(false); // Set loading to false once data is fetched or an error occurs
		}
	};

	// Function to handle pagination
	const paginate = (pageNumber) => {
		if (pageNumber >= 1 && pageNumber <= totalPages) {
			setCurrentPage(pageNumber); // Set the current page
		}
	};

	return (
		<div className="payments">
			<div className="payment-header">
				<h2>Payments</h2>
				<input
					type="text"
					placeholder="Search payments..."
					className="search-bar"
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value); // Update search term
						setCurrentPage(1); // Reset to page 1 when searching
					}}
				/>
			</div>
			{loading ? (
				<div className="loading">Loading...</div> // Show loading message while fetching data
			) : payments.length === 0 ? (
				<div className="no-data">No data found</div> // Show message if no payments are available
			) : (
				<>
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
								<tr key={payment.payment_id}>
									<td>{payment.payment_id}</td>
									<td>
										{payment.user_details
											? `${payment.user_details.first_name} ${payment.user_details.last_name}`
											: "N/A"}
									</td>
									<td>₹{payment.amount.toFixed(2)}</td>
									<td>{payment.payment_method}</td>
									<td>{payment.payment_status}</td>
									<td>{new Date(payment.created_at).toLocaleDateString()}</td>
									<td>
										<Link
											to={`/payments/${payment.payment_id}`}
											className="edit-link"
										>
											View
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="pagination">
						<button
							onClick={() => paginate(currentPage - 1)}
							disabled={currentPage === 1} // Disable "Prev" button if on the first page
						>
							Prev
						</button>
						{Array.from({ length: totalPayments }, (_, index) => (
							<button
								key={index}
								onClick={() => paginate(index + 1)}
								className={index + 1 === currentPage ? "active" : ""} // Highlight the current page
							>
								{index + 1}
							</button>
						))}
						<button
							onClick={() => paginate(currentPage + 1)}
							disabled={currentPage === totalPayments} // Disable "Next" button if on the last page
						>
							Next
						</button>
					</div>
				</>
			)}
		</div>
	);
}

export default Payments;

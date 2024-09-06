import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../asserts/style/Payment/Payments.css";
import { getPayments } from "../../services/api";
import { toast } from "react-toastify";

function Payments() {
	const [payments, setPayments] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10);
	const [totalPayments, setTotalPayments] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			fetchPayments();
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm]);

	useEffect(() => {
		fetchPayments();
	}, [currentPage]);

	const fetchPayments = async () => {
		setLoading(true);
		try {
			const response = await getPayments(currentPage, itemsPerPage, searchTerm);
			setPayments(response.data);
			setTotalPayments(response.total_count);
		} catch (error) {
			toast.error(error.message || "Failed to fetch payments");
		} finally {
			setLoading(false);
		}
	};

	const paginate = (pageNumber) => {
		if (pageNumber >= 1 && pageNumber <= totalPayments) {
			setCurrentPage(pageNumber);
		}
	};

	const totalPages = totalPayments;

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
						setSearchTerm(e.target.value);
						setCurrentPage(1); // Reset to page 1 when searching
					}}
				/>
			</div>
			{loading ? (
				<div className="loading">Loading...</div>
			) : payments.length === 0 ? (
				<div className="no-data">No data found</div>
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
							disabled={currentPage === 1}
						>
							Prev
						</button>
						{Array.from({ length: totalPages }, (_, index) => (
							<button
								key={index}
								onClick={() => paginate(index + 1)}
								className={index + 1 === currentPage ? "active" : ""}
							>
								{index + 1}
							</button>
						))}
						<button
							onClick={() => paginate(currentPage + 1)}
							disabled={currentPage === totalPages}
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

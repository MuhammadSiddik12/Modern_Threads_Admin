import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../asserts/style/Payment/Payments.css";
import { getPayments } from "../../services/api";
import { toast } from "react-toastify";

function Payments() {
	const [payments, setPayments] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemPerPage] = useState(10); // Categories per page
	const [totalPayments, setTotalPayments] = useState(0); // To keep track of total categories

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			fetchPayments(); // Fetch categories whenever search input changes after a delay
		}, 500); // Delay of 500ms

		return () => clearTimeout(delayDebounceFn); // Cleanup the timeout if search changes again
	}, [searchTerm]);

	useEffect(() => {
		fetchPayments();
	}, [currentPage]);

	const fetchPayments = async () => {
		try {
			const paymentsData = await getPayments(
				currentPage,
				itemPerPage,
				searchTerm
			);
			setPayments(paymentsData.data);
			setTotalPayments(paymentsData.total_count);
		} catch (error) {
			toast.error(error);
		}
	};

	const paginate = (pageNumber) => {
		if (pageNumber >= 1 && pageNumber <= totalPayments) {
			setCurrentPage(pageNumber);
			console.log("🚀 ~ paginate ~ pageNumber:", pageNumber);
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
						setSearchTerm(e.target.value);
						setCurrentPage(1); // Reset to page 1 when searching
					}}
				/>
			</div>
			{payments.length === 0 ? (
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
					<div className="pagination">
						<button
							onClick={() => paginate(currentPage - 1)}
							disabled={currentPage === 1}
						>
							Prev
						</button>
						{Array.from({ length: totalPayments }, (_, index) => (
							<button key={index} onClick={() => paginate(index + 1)}>
								{index + 1}
							</button>
						))}
						<button
							onClick={() => paginate(currentPage + 1)}
							disabled={currentPage === totalPayments}
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

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../asserts/style/Order/Orders.css";
import { fetchOrders } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Orders() {
	const [orders, setOrders] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10);
	const [totalOrders, setTotalOrders] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			getOrders(); // Fetch orders whenever search input changes after a delay
		}, 500); // Delay of 500ms

		return () => clearTimeout(delayDebounceFn); // Cleanup the timeout if search changes again
	}, [searchTerm, currentPage]);

	const getOrders = async () => {
		setLoading(true);
		try {
			const response = await fetchOrders(currentPage, itemsPerPage, searchTerm);
			setOrders(response.data);
			setTotalOrders(response.total_count);
		} catch (error) {
			setError(error.message || "Failed to fetch orders");
			toast.error(error.message || "Failed to fetch orders");
		} finally {
			setLoading(false);
		}
	};

	const paginate = (pageNumber) => {
		if (pageNumber >= 1 && pageNumber <= totalOrders) {
			setCurrentPage(pageNumber);
		}
	};

	if (loading) {
		return <div className="loading">Loading...</div>;
	}

	if (error) {
		return <div className="error">Error: {error}</div>;
	}

	return (
		<div className="orders">
			<div className="order-header">
				<h2>Orders</h2>
				<input
					type="text"
					placeholder="Search orders..."
					className="search-bar"
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value);
						setCurrentPage(1); // Reset to page 1 when searching
					}}
				/>
			</div>
			{orders.length === 0 ? (
				<div className="no-data">No data found</div>
			) : (
				<>
					<table>
						<thead>
							<tr>
								<th>Order ID</th>
								<th>Total Amount</th>
								<th>Items</th>
								<th>Status</th>
								<th>Date</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order.order_id}>
									<td>{order.order_id}</td>
									<td>₹{order.total_price}</td>
									<td>{order.order_items}</td>
									<td>{order.order_status}</td>
									<td>{new Date(order.created_at).toLocaleDateString()}</td>
									<td>
										<Link
											to={`/orders/${order.order_id}`}
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
						{Array.from({ length: totalOrders }, (_, index) => (
							<button
								key={index + 1}
								onClick={() => paginate(index + 1)}
								className={currentPage === index + 1 ? "active" : ""}
							>
								{index + 1}
							</button>
						))}
						<button
							onClick={() => paginate(currentPage + 1)}
							disabled={currentPage === totalOrders}
						>
							Next
						</button>
					</div>
				</>
			)}
		</div>
	);
}

export default Orders;

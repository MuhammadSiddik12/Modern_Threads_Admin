import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../asserts/style/Order/Orders.css";
import { fetchOrders } from "../../services/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Orders() {
	const [orders, setOrders] = useState([]); // State to store list of orders
	const [searchTerm, setSearchTerm] = useState(""); // State to manage search input
	const [currentPage, setCurrentPage] = useState(1); // State to manage current page
	const [itemsPerPage] = useState(10); // Number of items per page
	const [totalOrders, setTotalOrders] = useState(0); // State to manage total number of orders
	const [loading, setLoading] = useState(true); // State to manage loading status
	const [error, setError] = useState(null); // State to manage error messages

	// Effect to fetch orders data when search term or current page changes
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			getOrders(); // Fetch orders with the current search term and page number
		}, 500); // Delay of 500ms for debouncing search input

		return () => clearTimeout(delayDebounceFn); // Cleanup debounce timeout if search or page changes
	}, [searchTerm, currentPage]);

	// Function to fetch orders data from the API
	const getOrders = async () => {
		setLoading(true); // Set loading to true when fetching starts
		try {
			const response = await fetchOrders(currentPage, itemsPerPage, searchTerm);
			setOrders(response.data); // Update orders state with fetched data
			setTotalOrders(response.total_count); // Update total orders count
		} catch (error) {
			setError(error.message || "Failed to fetch orders"); // Update error state and show toast error
			toast.error(error.message || "Failed to fetch orders");
		} finally {
			setLoading(false); // Set loading to false once data is fetched or an error occurs
		}
	};

	// Function to handle pagination
	const paginate = (pageNumber) => {
		if (pageNumber >= 1 && pageNumber <= totalOrders) {
			setCurrentPage(pageNumber); // Set the current page
		}
	};

	// Show loading message while fetching data
	if (loading) {
		return <div className="loading">Loading...</div>;
	}

	// Show error message if there is an error
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
						setSearchTerm(e.target.value); // Update search term
						setCurrentPage(1); // Reset to page 1 when searching
					}}
				/>
			</div>
			{orders.length === 0 ? (
				<div className="no-data">No data found</div> // Show message if no orders are available
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
							disabled={currentPage === 1} // Disable "Prev" button if on the first page
						>
							Prev
						</button>
						{Array.from({ length: totalOrders }, (_, index) => (
							<button
								key={index + 1}
								onClick={() => paginate(index + 1)}
								className={currentPage === index + 1 ? "active" : ""} // Highlight the current page
							>
								{index + 1}
							</button>
						))}
						<button
							onClick={() => paginate(currentPage + 1)}
							disabled={currentPage === totalOrders} // Disable "Next" button if on the last page
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

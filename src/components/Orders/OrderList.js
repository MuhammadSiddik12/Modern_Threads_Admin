import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../asserts/style/Orders.css";
import { fetchOrders } from "../../services/api"; // Assume this is the API call function

function Orders() {
	const [orders, setOrders] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemPerPage] = useState(10); // Categories per page
	const [totalOrders, setTotalOrders] = useState(0); // To keep track of total categories

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			getOrders(); // Fetch categories whenever search input changes after a delay
		}, 500); // Delay of 500ms

		return () => clearTimeout(delayDebounceFn); // Cleanup the timeout if search changes again
	}, [searchTerm]);

	useEffect(() => {
		getOrders();
	}, [currentPage]);

	const getOrders = async () => {
		try {
			const response = await fetchOrders(currentPage, itemPerPage, searchTerm); // Fetch orders from the API
			console.log("🚀 ~ getOrders ~ response:", response);
			setOrders(response.data);
			setTotalOrders(response.total_count);
		} catch (error) {
			console.error("Error fetching orders:", error);
		}
	};

	const paginate = (pageNumber) => {
		if (pageNumber >= 1 && pageNumber <= totalOrders) {
			setCurrentPage(pageNumber);
			console.log("🚀 ~ paginate ~ pageNumber:", pageNumber);
		}
	};

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
								<th>Cart Items</th>
								<th>Status</th>
								<th>Date</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order.order_id}>
									<td>{order.order_id}</td>
									<td>{order.total_price}</td>
									<td>{order.order_items}</td>
									<td>{order.order_status}</td>
									<td>{order.created_at}</td>
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
							<button key={index} onClick={() => paginate(index + 1)}>
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

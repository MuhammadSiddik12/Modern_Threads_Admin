import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../services/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../asserts/style/Users/Users.css";

function Users() {
	const [users, setUsers] = useState([]); // State to store users
	const [loading, setLoading] = useState(true); // State to manage loading state
	const [currentPage, setCurrentPage] = useState(1); // State to manage current page
	const [usersPerPage] = useState(10); // Users per page
	const [totalUsers, setTotalUsers] = useState(0); // State to track total users
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const fetchUsers = async () => {
			setLoading(true);
			try {
				const response = await getAllUsers(
					currentPage,
					usersPerPage,
					searchTerm
				);
				setUsers(response.data);
				setTotalUsers(response.total_count); // Assuming API returns total user count
			} catch (error) {
				toast.error("Failed to fetch users.");
				console.error("Error fetching users:", error);
			} finally {
				setLoading(false);
			}
		};

		const delayDebounceFn = setTimeout(() => {
			fetchUsers();
		}, 500);

		// Cleanup timeout if searchTerm or currentPage changes again before delay is over
		return () => clearTimeout(delayDebounceFn);
	}, [currentPage, searchTerm]);

	const paginate = (pageNumber) => {
		if (pageNumber >= 1 && pageNumber <= totalUsers) {
			setCurrentPage(pageNumber);
		}
	};

	if (loading) {
		return (
			<div className="loading-container">
				<div className="user-header">
					<h2>Users</h2>
					<input
						type="text"
						placeholder="Search users..."
						className="search-bar"
						value={searchTerm}
						onChange={(e) => {
							setSearchTerm(e.target.value);
							setCurrentPage(1); // Reset to page 1 when searching
						}}
					/>
				</div>
				<div className="loading">Loading...</div>
			</div>
		);
	}

	return (
		<div className="users">
			<div className="user-header">
				<h2>Users</h2>
				<input
					type="text"
					placeholder="Search users..."
					className="search-bar"
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value);
						setCurrentPage(1); // Reset to page 1 when searching
					}}
				/>
			</div>

			{users.length === 0 ? (
				<div className="no-data">No users found</div>
			) : (
				<>
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Email</th>
								<th>Details</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user.user_id}>
									<td>{user.user_id}</td>
									<td>{user.first_name + " " + user.last_name}</td>
									<td>{user.email}</td>
									<td>
										<Link to={`/users/${user.user_id}`} className="edit-link">
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
						{Array.from({ length: totalUsers }, (_, index) => (
							<button
								key={index}
								onClick={() => paginate(index + 1)}
								className={currentPage === index + 1 ? "active" : ""}
							>
								{index + 1}
							</button>
						))}
						<button
							onClick={() => paginate(currentPage + 1)}
							disabled={currentPage === totalUsers}
						>
							Next
						</button>
					</div>
				</>
			)}
		</div>
	);
}

export default Users;

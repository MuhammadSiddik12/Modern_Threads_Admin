import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../services/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../asserts/style/Users/Users.css";

function Users() {
	const [users, setUsers] = useState([]); // State to store the list of users
	const [loading, setLoading] = useState(true); // State to manage loading status
	const [currentPage, setCurrentPage] = useState(1); // State to manage the current page
	const [usersPerPage] = useState(10); // Number of users displayed per page
	const [totalUsers, setTotalUsers] = useState(0); // State to track the total number of users
	const [searchTerm, setSearchTerm] = useState(""); // State to handle the search term

	// Effect to fetch users when component mounts or `currentPage` or `searchTerm` changes
	useEffect(() => {
		const fetchUsers = async () => {
			setLoading(true); // Set loading to true before fetching data
			try {
				const response = await getAllUsers(
					currentPage,
					usersPerPage,
					searchTerm
				);
				setUsers(response.data); // Set fetched users to state
				setTotalUsers(response.total_count); // Set total users count from API response
			} catch (error) {
				toast.error("Failed to fetch users."); // Show error toast on failure
				console.error("Error fetching users:", error); // Log the error
			} finally {
				setLoading(false); // Set loading to false after fetching data
			}
		};

		const delayDebounceFn = setTimeout(() => {
			fetchUsers(); // Fetch users with a debounce effect
		}, 500);

		// Cleanup function to clear the timeout if dependencies change before timeout completes
		return () => clearTimeout(delayDebounceFn);
	}, [currentPage, searchTerm]); // Dependencies: `currentPage` and `searchTerm`

	const paginate = (pageNumber) => {
		// Update the current page if it's within the valid range
		if (pageNumber >= 1 && pageNumber <= totalUsers) {
			setCurrentPage(pageNumber);
		}
	};

	if (loading) {
		// Render loading state while fetching data
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
							setSearchTerm(e.target.value); // Update search term
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
						setSearchTerm(e.target.value); // Update search term
						setCurrentPage(1); // Reset to page 1 when searching
					}}
				/>
			</div>

			{users.length === 0 ? (
				<div className="no-data">No users found</div> // Display message if no users are found
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
							disabled={currentPage === 1} // Disable "Prev" button on the first page
						>
							Prev
						</button>
						{Array.from({ length: totalUsers }, (_, index) => (
							<button
								key={index}
								onClick={() => paginate(index + 1)}
								className={currentPage === index + 1 ? "active" : ""} // Highlight active page
							>
								{index + 1}
							</button>
						))}
						<button
							onClick={() => paginate(currentPage + 1)}
							disabled={currentPage === totalUsers} // Disable "Next" button on the last page
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

import React, { useState, useEffect } from "react";
import "../../asserts/style/Users.css";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Users() {
	const [users, setUsers] = useState([]); // State to store users
	const [loading, setLoading] = useState(true); // State to manage loading state

	useEffect(() => {
		// Function to fetch users from the API
		const fetchUsers = async () => {
			try {
				const response = await getAllUsers();
				setUsers(response.data); // Set the users data
				setLoading(false); // Set loading to false
			} catch (error) {
				toast.error(error);
				setLoading(false); // Set loading to false
			}
		};

		fetchUsers(); // Fetch users when component mounts
	}, []);

	if (loading) {
		return <div>Loading...</div>; // Show loading state
	}

	return (
		<div className="users">
			<h2>Users</h2>
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
		</div>
	);
}

export default Users;

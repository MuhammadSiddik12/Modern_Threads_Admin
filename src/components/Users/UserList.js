import React from "react";
import "../../asserts/style/Users.css";
import { Link } from "react-router-dom";

function Users() {
	const users = [
		{ id: 1, name: "John Doe", email: "siddik@yopmail.com" },
		{ id: 2, name: "Jane Smith", email: "siddik@yopmail.com" },
		// Add more users here
	];

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
					{users.map((user, index) => (
						<tr key={index}>
							<td>{user.id}</td>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>
								<Link to={`/users/${user.id}`} className="edit-link">
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

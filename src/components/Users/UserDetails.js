import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../asserts/style/UserDetails.css";

function UserDetails() {
	const { id } = useParams(); // Get the user ID from the URL
	const [user, setUser] = useState(null);

	useEffect(() => {
		// Fetch user data based on the ID (replace with actual API call)
		// For now, we're using static data for demonstration
		const fetchUserData = async () => {
			const users = [
				{
					id: 1,
					name: "John Doe",
					email: "john.doe@example.com",
					role: "Admin",
				},
				{
					id: 2,
					name: "Jane Smith",
					email: "jane.smith@example.com",
					role: "User",
				},
				// Add more users here
			];
			const userData = users.find((user) => user.id === parseInt(id));
			setUser(userData);
		};

		fetchUserData();
	}, [id]);

	if (!user) {
		return <div>Loading...</div>;
	}

	return (
		<div className="user-details">
			<h2>User Details</h2>
			<div className="user-info">
				<p>
					<strong>ID:</strong> {user.id}
				</p>
				<p>
					<strong>Name:</strong> {user.name}
				</p>
				<p>
					<strong>Email:</strong> {user.email}
				</p>
				<p>
					<strong>Role:</strong> {user.role}
				</p>
			</div>
		</div>
	);
}

export default UserDetails;

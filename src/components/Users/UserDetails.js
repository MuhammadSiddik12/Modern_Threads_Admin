import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../asserts/style/UserDetails.css";
import { getUserById } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserDetails() {
	const { id } = useParams(); // Get the user ID from the URL
	const [user, setUser] = useState(null);

	useEffect(() => {
		// Fetch user data based on the ID (replace with actual API call)
		// For now, we're using static data for demonstration
		const fetchUserData = async () => {
			try {
				const res = await getUserById(id);
				setUser(res.data);
			} catch (error) {
				toast.error(error);
			}
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
					<strong>ID:</strong> {user.user_id}
				</p>
				<p>
					<strong>Name:</strong> {user.first_name + " " + user.last_name}
				</p>
				<p>
					<strong>Email:</strong> {user.email}
				</p>
			</div>
		</div>
	);
}

export default UserDetails;

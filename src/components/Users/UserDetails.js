import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../asserts/style/Users/UserDetails.css";
import { getUserById, IMAGE_BASE_URL } from "../../services/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserDetails() {
	const { id } = useParams(); // Get the user ID from the URL
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true); // State to handle loading

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const res = await getUserById(id);
				setUser(res.data);
			} catch (error) {
				toast.error("Failed to fetch user data.");
				console.error("Error fetching user data:", error);
			} finally {
				setLoading(false); // Stop loading
			}
		};

		fetchUserData();
	}, [id]);

	if (loading) {
		return <div className="loading">Loading...</div>; // Custom loading state
	}

	if (!user) {
		return <div className="error">User not found</div>; // Handle case where user is not found
	}

	const defaultProfilePic = "https://via.placeholder.com/150"; // URL for default image

	return (
		<div className="user-details">
			<h2>User Details</h2>
			<div className="user-info">
				<img
					src={
						user.profile_pic
							? `${IMAGE_BASE_URL}${user.profile_pic}`
							: defaultProfilePic
					}
					alt={`${user.first_name} ${user.last_name}`}
					className="user-profile-pic"
				/>
				<p>
					<strong>ID:</strong> {user.user_id}
				</p>
				<p>
					<strong>Name:</strong> {user.first_name} {user.last_name}
				</p>
				<p>
					<strong>Email:</strong> {user.email}
				</p>
			</div>
		</div>
	);
}

export default UserDetails;

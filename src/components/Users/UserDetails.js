import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../asserts/style/Users/UserDetails.css";
import { getUserById, IMAGE_BASE_URL } from "../../services/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserDetails() {
	const { id } = useParams(); // Get the user ID from the URL parameters
	const [user, setUser] = useState(null); // State to store user data
	const [loading, setLoading] = useState(true); // State to handle loading

	// Effect to fetch user data when component mounts or `id` changes
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const res = await getUserById(id); // Fetch user data by ID
				setUser(res.data); // Set user data to state
			} catch (error) {
				toast.error("Failed to fetch user data."); // Display error message
				console.error("Error fetching user data:", error); // Log error
			} finally {
				setLoading(false); // Stop loading
			}
		};

		fetchUserData();
	}, [id]); // Dependency array includes `id` to refetch data when it changes

	// Show loading state while fetching data
	if (loading) {
		return <div className="loading">Loading...</div>; // Custom loading state
	}

	// Handle case where user data is not found
	if (!user) {
		return <div className="error">User not found</div>; // Display error message
	}

	const defaultProfilePic = "https://via.placeholder.com/150"; // URL for default profile picture

	return (
		<div className="user-details">
			<h2>User Details</h2>
			<div className="user-info">
				<img
					src={
						user.profile_pic
							? `${IMAGE_BASE_URL}${user.profile_pic}` // Use user's profile picture if available
							: defaultProfilePic // Use default picture if user's profile picture is not available
					}
					alt={`${user.first_name} ${user.last_name}`} // Alt text for image
					className="user-profile-pic"
				/>
				<p>
					<strong>ID:</strong> {user.user_id} {/* Display user ID */}
				</p>
				<p>
					<strong>Name:</strong> {user.first_name} {user.last_name}{" "}
					{/* Display user's full name */}
				</p>
				<p>
					<strong>Email:</strong> {user.email} {/* Display user's email */}
				</p>
			</div>
		</div>
	);
}

export default UserDetails;

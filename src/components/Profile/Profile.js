import React, { useState, useEffect } from "react";
import { getAdminDetails, updateAdminDetails } from "../../services/ApiService";
import { toast } from "react-toastify";
import "../../asserts/style/Profile/Profile.css";

function AdminProfile() {
	// State to hold the admin profile details
	const [admin, setAdmin] = useState({
		admin_name: "",
		admin_email: "",
	});

	// State to toggle between viewing and editing mode
	const [isEditing, setIsEditing] = useState(false);

	// Effect to fetch admin details when the component mounts
	useEffect(() => {
		const fetchAdminDetails = async () => {
			try {
				const response = await getAdminDetails(); // Fetch admin details from API
				setAdmin(response.data); // Update state with fetched details
			} catch (error) {
				toast.error("Failed to load admin details"); // Show error if fetching fails
			}
		};

		fetchAdminDetails(); // Call the function to fetch data
	}, []); // Empty dependency array ensures this runs only once after initial render

	// Handler for input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setAdmin((prevAdmin) => ({
			...prevAdmin,
			[name]: value,
		}));
	};

	// Handler for form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		try {
			await updateAdminDetails(admin); // Call API to update admin details
			toast.success("Admin details updated successfully"); // Show success toast
			setIsEditing(false); // Switch back to view mode
		} catch (error) {
			toast.error("Failed to update admin details"); // Show error toast if update fails
		}
	};

	return (
		<div className="admin-profile">
			<h2>Admin Profile</h2>
			{!isEditing ? (
				<div className="profile-details">
					<p>
						<strong>Name:</strong> {admin.admin_name}
					</p>
					<p>
						<strong>Email:</strong> {admin.admin_email}
					</p>
					<button onClick={() => setIsEditing(true)} className="edit-btn">
						Edit Profile
					</button>
				</div>
			) : (
				<form onSubmit={handleSubmit} className="profile-form">
					<div className="form-group">
						<label htmlFor="admin_name">Name:</label>
						<input
							type="text"
							id="admin_name"
							name="admin_name"
							value={admin.admin_name}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="admin_email">Email:</label>
						<input
							type="email"
							id="admin_email"
							name="admin_email"
							value={admin.admin_email}
							onChange={handleChange}
							required
						/>
					</div>
					<button type="submit" className="save-btn">
						Save Changes
					</button>
					<button
						type="button"
						onClick={() => setIsEditing(false)}
						className="cancel-btn"
					>
						Cancel
					</button>
				</form>
			)}
		</div>
	);
}

export default AdminProfile;

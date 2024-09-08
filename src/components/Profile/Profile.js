import React, { useState, useEffect } from "react";
import { getAdminDetails, updateAdminDetails } from "../../services/ApiService";
import { toast } from "react-toastify";
import "../../asserts/style/Profile/Profile.css";

function AdminProfile() {
	const [admin, setAdmin] = useState({
		admin_name: "",
		admin_email: "",
	});

	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		const fetchAdminDetails = async () => {
			try {
				const response = await getAdminDetails();
				setAdmin(response.data);
			} catch (error) {
				toast.error("Failed to load admin details");
			}
		};

		fetchAdminDetails();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setAdmin((prevAdmin) => ({
			...prevAdmin,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await updateAdminDetails(admin);
			toast.success("Admin details updated successfully");
			setIsEditing(false);
		} catch (error) {
			toast.error("Failed to update admin details");
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

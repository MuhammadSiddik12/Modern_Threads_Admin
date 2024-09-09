import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../asserts/style/Category/AddCategory.css";
import { addCategory, uploadImage } from "../../services/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCategory() {
	const [category, setCategory] = useState({ name: "", image: null }); // State to store category name and image
	const [loading, setLoading] = useState(false); // State to manage loading state
	const navigate = useNavigate(); // Hook for navigation

	const handleChange = (e) => {
		setCategory({ ...category, name: e.target.value }); // Update category name
	};

	const handleImageChange = (e) => {
		setCategory({ ...category, image: e.target.files[0] }); // Update category image
	};

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		setLoading(true); // Set loading state to true

		let imageUrl = null;

		try {
			// Upload the image if one is selected
			if (category.image) {
				const formData = new FormData();
				formData.append("image", category.image);

				const data = await uploadImage(formData); // Upload image
				console.log("🚀 ~ handleSubmit ~ data:", data);
				imageUrl = data.filePath; // Adjust based on the actual response structure
			}

			// Add the category with the image URL (if available)
			const categoryData = {
				category_name: category.name,
				category_image: imageUrl, // Include the image URL in the request
			};

			await addCategory(categoryData); // Add category
			toast.success("Category added successfully!"); // Show success message
			navigate("/categories"); // Navigate to categories page
		} catch (error) {
			console.error("Error adding category:", error); // Log error
			toast.error(
				error.response?.data?.message ||
					error.message ||
					"Failed to add category" // Show error message
			);
		} finally {
			setLoading(false); // Reset loading state
		}
	};

	return (
		<div className="add-category">
			<h2>Add New Category</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Category Name:</label>
				<input
					type="text"
					id="name"
					value={category.name}
					onChange={handleChange}
					required
				/>

				<label htmlFor="image">Upload Category Image:</label>
				<input
					type="file"
					id="image"
					accept="image/*"
					onChange={handleImageChange}
				/>

				<button type="submit" disabled={loading}>
					{loading ? "Adding..." : "Add Category"} {/* Show loading state */}
				</button>
			</form>
		</div>
	);
}

export default AddCategory;

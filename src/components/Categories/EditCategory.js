import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../asserts/style/Category/EditCategory.css";
import {
	updateCategory,
	deleteCategory,
	getCategoryById,
	uploadImage,
	IMAGE_BASE_URL,
} from "../../services/ApiService"; // Import API functions
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditCategory() {
	const { id } = useParams(); // Get category ID from URL
	const navigate = useNavigate(); // Use useNavigate for navigation
	const [category, setCategory] = useState({
		category_name: "",
		category_image: "",
	});
	const [loading, setLoading] = useState(false); // Manage loading state

	useEffect(() => {
		const fetchCategory = async () => {
			setLoading(true); // Start loading
			try {
				const response = await getCategoryById(id); // Fetch category details by ID
				setCategory(response.data); // Set fetched data to category state
			} catch (error) {
				toast.error(error.message || "Error fetching category"); // Show error message
			} finally {
				setLoading(false); // Stop loading
			}
		};
		fetchCategory();
	}, [id]);

	const handleChange = (e) => {
		setCategory({ ...category, category_name: e.target.value }); // Update category name
	};

	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("image", file);

		setLoading(true); // Start loading
		try {
			const response = await uploadImage(formData); // Upload image
			const imageUrl = response.filePath; // Get uploaded image URL
			setCategory({ ...category, category_image: imageUrl }); // Update category with image URL
			toast.success("Image uploaded successfully!"); // Success message
		} catch (error) {
			toast.error(error.message || "Error uploading image"); // Error message
		} finally {
			setLoading(false); // Stop loading
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true); // Start loading
		try {
			await updateCategory(category); // Update category
			navigate("/categories"); // Redirect to categories page
			toast.success("Category edited successfully!"); // Success message
		} catch (error) {
			toast.error(error.message || "Error updating category"); // Error message
		} finally {
			setLoading(false); // Stop loading
		}
	};

	const handleDelete = async () => {
		setLoading(true); // Start loading
		if (window.confirm("Are you sure you want to delete this category?")) {
			try {
				await deleteCategory(id); // Delete category
				navigate("/categories"); // Redirect to categories page
				toast.success("Category deleted successfully!"); // Success message
			} catch (error) {
				toast.error(error.message || "Error deleting category"); // Error message
			} finally {
				setLoading(false); // Stop loading
			}
		}
	};

	return (
		<div className="edit-category">
			<h2>Edit Category</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="category_name">Category Name:</label>
				<input
					type="text"
					id="category_name"
					value={category.category_name}
					onChange={handleChange}
					required
					disabled={loading} // Disable input while loading
				/>
				<label htmlFor="image">Upload Image:</label>
				<input
					type="file"
					id="image"
					accept="image/*"
					onChange={handleImageUpload}
					disabled={loading} // Disable input while loading
				/>
				{category.category_image && (
					<div className="image-preview">
						<img
							src={`${IMAGE_BASE_URL}${category.category_image}`}
							alt={category.category_name}
							width="auto"
							height="150"
						/>
					</div>
				)}
				<button className="edit-button" type="submit" disabled={loading}>
					{loading ? "Saving..." : "Save"} // Show loading text while saving
				</button>
			</form>
			<button
				onClick={handleDelete}
				className="delete-button"
				disabled={loading} // Disable button while loading
			>
				{loading ? "Deleting..." : "Delete Category"} // Show loading text while
				deleting
			</button>
		</div>
	);
}

export default EditCategory;

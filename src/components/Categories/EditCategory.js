import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../asserts/style/Category/EditCategory.css";
import {
	updateCategory,
	deleteCategory,
	getCategoryById,
	uploadImage,
	IMAGE_BASE_URL,
} from "../../services/api"; // Import API functions
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditCategory() {
	const { id } = useParams(); // Get category ID from URL
	const navigate = useNavigate(); // Use useNavigate for navigation
	const [category, setCategory] = useState({
		category_name: "",
		category_image: "",
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const data = await getCategoryById(id); // Fetch category details by ID
				setCategory(data.data); // Set the fetched data to category state
			} catch (error) {
				toast.error(error.message || "Error fetching category");
			}
		};
		fetchCategory();
	}, [id]);

	const handleChange = (e) => {
		setCategory({ ...category, category_name: e.target.value });
	};

	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("image", file);

		try {
			const response = await uploadImage(formData); // Upload image to the server
			const imageUrl = response.data.filePath; // Get the uploaded image URL
			setCategory({ ...category, category_image: imageUrl }); // Update category with the image URL
			toast.success("Image uploaded successfully!");
		} catch (error) {
			toast.error(error.message || "Error uploading image");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await updateCategory(category); // Update category with the image URL and name
			navigate("/categories"); // Redirect to categories page after saving
			toast.success("Category edited successfully!");
		} catch (error) {
			toast.error(error.message || "Error updating category");
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async () => {
		setLoading(true);
		try {
			await deleteCategory(id); // Call API to delete category
			navigate("/categories");
			toast.success("Category deleted successfully!");
		} catch (error) {
			toast.error(error.message || "Error deleting category");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="edit-category">
			<h2>Edit Category</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Category Name:</label>
				<input
					type="text"
					id="category_name"
					value={category.category_name}
					onChange={handleChange}
					required
				/>
				<label htmlFor="image">Upload Image:</label>
				<input
					type="file"
					id="image"
					accept="image/*"
					onChange={handleImageUpload}
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
					{loading ? "Saving..." : "Save"}
				</button>
			</form>
			<button
				onClick={handleDelete}
				className="delete-button"
				disabled={loading}
			>
				{loading ? "Deleting..." : "Delete Category"}
			</button>
		</div>
	);
}

export default EditCategory;

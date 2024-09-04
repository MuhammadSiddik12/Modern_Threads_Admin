import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../asserts/style/EditCategory.css";
import {
	updateCategory,
	deleteCategory,
	getCategoryById,
} from "../../services/api"; // Import API functions
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditCategory() {
	const { id } = useParams(); // Get category ID from URL
	const navigate = useNavigate(); // Use useNavigate for navigation
	const [category, setCategory] = useState({ category_name: "" });
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const data = await getCategoryById(id); // Fetch category details by ID
				setCategory(data.data); // Set the fetched data to category state
			} catch (error) {
				toast.error(error);
			}
		};
		fetchCategory();
	}, [id]);

	const handleChange = (e) => {
		setCategory({ ...category, category_name: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await updateCategory(id, category.category_name); // Call API to update category
			navigate("/categories"); // Redirect to categories page after saving
			toast.success("Category edited successfully!");
		} catch (error) {
			toast.error(error);
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
			toast.error(error);
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

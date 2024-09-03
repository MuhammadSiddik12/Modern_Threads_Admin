import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../asserts/style/EditCategory.css"; // Add your styles here

function EditCategory() {
	const { id } = useParams(); // Get category ID from URL
	const navigate = useNavigate(); // Use useNavigate for navigation

	// Sample static data for categories
	const [category, setCategory] = useState({ name: "" });

	useEffect(() => {
		// Simulate fetching category data based on ID
		const fetchCategory = () => {
			// Replace with actual API call
			const categories = [
				{ id: 1, name: "Electronics" },
				{ id: 2, name: "Fashion" },
				{ id: 3, name: "Home & Kitchen" },
			];
			const selectedCategory = categories.find(
				(cat) => cat.id === parseInt(id)
			);
			if (selectedCategory) {
				setCategory(selectedCategory);
			}
		};

		fetchCategory();
	}, [id]);

	const handleChange = (e) => {
		setCategory({ ...category, name: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle update logic here
		console.log("Updated category:", category);
		navigate("/categories"); // Redirect to categories page after saving
	};

	const handleDelete = () => {
		// Handle delete logic here
		console.log("Deleted category:", id);
		navigate("/categories");
	};

	return (
		<div className="edit-category">
			<h2>Edit Category</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Category Name:</label>
				<input
					type="text"
					id="name"
					value={category.name}
					onChange={handleChange}
					required
				/>
				<button className="edit-button" type="submit">
					Save
				</button>
			</form>
			<button onClick={handleDelete} className="delete-button">
				Delete Category
			</button>
		</div>
	);
}

export default EditCategory;

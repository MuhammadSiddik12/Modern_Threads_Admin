import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../asserts/style/AddCategory.css";

function AddCategory() {
	const [category, setCategory] = useState({ name: "" });
	const navigate = useNavigate();

	const handleChange = (e) => {
		setCategory({ ...category, name: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Replace with actual API call
			// await fetch("/api/categories", {
			// 	method: "POST",
			// 	headers: { "Content-Type": "application/json" },
			// 	body: JSON.stringify(category),
			// });
			navigate("/categories"); // Redirect after adding category
		} catch (error) {
			console.error("Error adding category:", error);
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
				<button type="submit">Add Category</button>
			</form>
		</div>
	);
}

export default AddCategory;

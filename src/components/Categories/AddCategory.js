import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../asserts/style/AddCategory.css";
import { addCategory } from "../../services/api"; // Import the addCategory API function
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCategory() {
	const [category, setCategory] = useState({ name: "" });
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setCategory({ ...category, name: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await addCategory({ category_name: category.name });
			toast.success("Category added successfully!");
			navigate("/categories"); // Redirect after adding category
		} catch (error) {
			console.error("Error adding category:", error);
			toast.error(error);
		} finally {
			setLoading(false);
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
				<button type="submit" disabled={loading}>
					{loading ? "Adding..." : "Add Category"}
				</button>
			</form>
		</div>
	);
}

export default AddCategory;

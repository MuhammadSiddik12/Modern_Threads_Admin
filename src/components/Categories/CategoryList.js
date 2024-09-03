import React from "react";
import "../../asserts/style/Categories.css";
import { Link, useNavigate } from "react-router-dom";

function Categories() {
	const navigate = useNavigate();

	// Sample static data for categories
	const categories = [
		{ id: 1, name: "Electronics" },
		{ id: 2, name: "Fashion" },
		{ id: 3, name: "Home & Kitchen" },
	];

	const handleAddCategory = () => {
		navigate("/add-category");
	};

	const handleDeleteCategory = (id) => {
		// Simulate deletion (replace with API call)
		const updatedCategories = categories.filter(
			(category) => category.id !== id
		);
		console.log(updatedCategories);
	};

	return (
		<div className="categories">
			<div className="categories-header">
				<h2>Categories</h2>
				<button className="add-category-button" onClick={handleAddCategory}>
					Add Category
				</button>
			</div>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Actions</th>
						<th>Details</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{categories.map((category) => (
						<tr key={category.id}>
							<td>{category.id}</td>
							<td>{category.name}</td>
							<td>
								<Link
									to={`/edit-category/${category.id}`}
									className="edit-link"
								>
									Edit
								</Link>
							</td>
							<td>
								<Link to={`/category/${category.id}`} className="edit-link">
									View
								</Link>
							</td>
							<td>
								<button
									className="delete-category-button"
									onClick={() => handleDeleteCategory(category.id)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Categories;

import React, { useEffect, useState } from "react";
import "../../asserts/style/Categories.css";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategories, deleteCategory } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Categories() {
	const navigate = useNavigate();
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true); // For loading state
	const [error, setError] = useState(null); // For error state

	useEffect(() => {
		// Fetch categories on component mount
		const fetchCategories = async () => {
			setLoading(true); // Start loading
			try {
				const data = await getAllCategories();
				console.log("🚀 ~ fetchCategories ~ data:", data);
				if (data.data && data.data.length > 0) {
					setCategories(data.data); // Assuming the response structure has a `categories` field
				} else {
					setError("Data not found");
				}
			} catch (error) {
				toast.error(error);
			} finally {
				setLoading(false); // Stop loading
			}
		};

		fetchCategories();
	}, []);

	const handleAddCategory = () => {
		navigate("/add-category");
	};

	const handleDeleteCategory = async (id) => {
		console.log("🚀 ~ handleDeleteCategory ~ id:", id);
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this category?"
		);
		if (confirmDelete) {
			try {
				await deleteCategory(id);
				setCategories(
					categories.filter((category) => category.category_id !== id)
				);
				toast.success("Category deleted successfully!");
			} catch (error) {
				toast.error(error);
			}
		}
	};

	if (loading) {
		return (
			<>
				<div className="categories-header">
					<h2>Categories</h2>
					<button className="add-category-button" onClick={handleAddCategory}>
						Add Category
					</button>
				</div>
				<div className="loader">Loading...</div>
			</>
		);
	}

	if (error) {
		return (
			<>
				<div className="categories-header">
					<h2>Categories</h2>
					<button className="add-category-button" onClick={handleAddCategory}>
						Add Category
					</button>
				</div>
				<div className="error-message">{error}</div>
			</>
		); // Render error message if there's an error
	}

	return (
		<div className="categories">
			<div className="categories-header">
				<h2>Categories</h2>
				<button className="add-category-button" onClick={handleAddCategory}>
					Add Category
				</button>
			</div>
			{categories.length === 0 ? (
				<div className="no-data">Data not found</div> // Show if no categories found
			) : (
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
						{categories.map((category, index) => (
							<tr key={index}>
								<td>{category.category_id}</td>
								<td>{category.category_name}</td>
								<td>
									<Link
										to={`/edit-category/${category.category_id}`}
										className="edit-link"
									>
										Edit
									</Link>
								</td>
								<td>
									<Link
										to={`/category/${category.category_id}`}
										className="edit-link"
									>
										View
									</Link>
								</td>
								<td>
									<button
										className="delete-category-button"
										onClick={() => handleDeleteCategory(category.category_id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default Categories;

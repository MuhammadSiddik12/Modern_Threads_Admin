import React, { useEffect, useState } from "react";
import "../../asserts/style/Category/Categories.css";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategories, deleteCategory } from "../../services/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Categories() {
	const navigate = useNavigate(); // Hook for navigation
	const [categories, setCategories] = useState([]); // State to store categories
	const [loading, setLoading] = useState(true); // State to manage loading state
	const [searchTerm, setSearchTerm] = useState(""); // State for search term
	const [currentPage, setCurrentPage] = useState(1); // State for current page
	const [categoriesPerPage] = useState(10); // Categories per page
	const [totalCategories, setTotalCategories] = useState(0); // Total number of categories

	useEffect(() => {
		// Debounced fetchCategories to avoid too many API calls
		const delayDebounceFn = setTimeout(() => {
			fetchCategories();
		}, 500);

		return () => clearTimeout(delayDebounceFn); // Cleanup timeout on component unmount or when dependencies change
	}, [currentPage, searchTerm]);

	const fetchCategories = async () => {
		setLoading(true); // Set loading state to true
		try {
			const { data, total_count } = await getAllCategories(
				currentPage,
				categoriesPerPage,
				searchTerm
			);
			setCategories(data); // Set the fetched categories
			setTotalCategories(total_count); // Set total categories count
		} catch (error) {
			toast.error("Failed to fetch categories. Please try again."); // Show error message
		} finally {
			setLoading(false); // Set loading state to false
		}
	};

	const handleAddCategory = () => {
		navigate("/add-category"); // Navigate to add category page
	};

	const handleDeleteCategory = async (id) => {
		if (window.confirm("Are you sure you want to delete this category?")) {
			try {
				await deleteCategory(id); // Delete category
				fetchCategories(); // Refresh categories list
				toast.success("Category deleted successfully!"); // Show success message
			} catch (error) {
				toast.error("Failed to delete category. Please try again."); // Show error message
			}
		}
	};

	const paginate = (pageNumber) => {
		if (pageNumber >= 1 && pageNumber <= totalCategories) {
			setCurrentPage(pageNumber); // Set the current page number
		}
	};

	if (loading) {
		return (
			<div className="categories">
				<div className="categories-header">
					<h2>Categories</h2>
					<button className="add-category-button" onClick={handleAddCategory}>
						Add Category
					</button>
					<input
						type="text"
						placeholder="Search categories..."
						className="search-bar"
						value={searchTerm}
						onChange={(e) => {
							setSearchTerm(e.target.value);
							setCurrentPage(1); // Reset to page 1 when searching
						}}
					/>
				</div>
				<div className="loader">Loading...</div>
			</div>
		);
	}

	return (
		<div className="categories">
			<div className="categories-header">
				<h2>Categories</h2>
				<button className="add-category-button" onClick={handleAddCategory}>
					Add Category
				</button>
				<input
					type="text"
					placeholder="Search categories..."
					className="search-bar"
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value);
						setCurrentPage(1); // Reset to page 1 when searching
					}}
				/>
			</div>
			{categories.length === 0 ? (
				<div className="no-data">No categories found</div> // Message for no categories
			) : (
				<>
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
								<tr key={category.category_id}>
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
					<div className="pagination">
						<button
							onClick={() => paginate(currentPage - 1)}
							disabled={currentPage === 1}
						>
							Prev
						</button>
						{Array.from({ length: totalCategories }, (_, index) => (
							<button
								key={index}
								onClick={() => paginate(index + 1)}
								className={index + 1 === currentPage ? "active" : ""}
							>
								{index + 1}
							</button>
						))}
						<button
							onClick={() => paginate(currentPage + 1)}
							disabled={currentPage === totalCategories}
						>
							Next
						</button>
					</div>
				</>
			)}
		</div>
	);
}

export default Categories;

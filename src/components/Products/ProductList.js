import React, { useState, useEffect } from "react";
import "../../asserts/style/Product/Products.css";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, getAllProducts } from "../../services/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Products() {
	const navigate = useNavigate();

	const [products, setProducts] = useState([]); // State to store products
	const [loading, setLoading] = useState(true); // State to manage loading state
	const [currentPage, setCurrentPage] = useState(1); // State to manage current page
	const [productsPerPage] = useState(10); // Products per page
	const [totalPages, setTotalPages] = useState(0); // State to track total pages
	const [searchTerm, setSearchTerm] = useState(""); // State to store search term

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true); // Set loading state to true before fetching
			try {
				const response = await getAllProducts(
					currentPage,
					productsPerPage,
					searchTerm
				);
				setProducts(response.data); // Set the products data
				setTotalPages(response.total_count); // Calculate total pages
				setLoading(false); // Set loading state to false after fetching
			} catch (error) {
				toast.error("Error fetching products: " + error.message);
				setLoading(false); // Set loading state to false if there's an error
			}
		};

		// Delay the API call when searchTerm changes
		const delayDebounceFn = setTimeout(() => {
			fetchProducts();
		}, 500);

		// Cleanup timeout if searchTerm or currentPage changes again before delay is over
		return () => clearTimeout(delayDebounceFn);
	}, [currentPage, searchTerm]); // Dependency array

	const handleDeleteProduct = async (id) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this product?" // Confirm deletion
		);
		if (confirmDelete) {
			try {
				await deleteProduct(id); // Delete the product
				setProducts(products.filter((product) => product.product_id !== id)); // Remove deleted product from the list
				toast.success("Product deleted successfully!"); // Show success message
			} catch (error) {
				toast.error("Error deleting product: " + error.message); // Show error message
			}
		}
	};

	// Pagination logic
	const paginate = (pageNumber) => {
		if (pageNumber >= 1 && pageNumber <= totalPages) {
			setCurrentPage(pageNumber); // Set the current page
		}
	};

	const handleAddProduct = () => {
		navigate("/products/add"); // Navigate to add product page
	};

	if (loading) {
		return (
			<div className="products">
				<div className="header">
					<h2>Products</h2>
					<button className="add-product-btn" onClick={handleAddProduct}>
						Add Product
					</button>
					<input
						type="text"
						placeholder="Search products..."
						className="search-bar-product"
						value={searchTerm}
						onChange={(e) => {
							setSearchTerm(e.target.value); // Update search term
							setCurrentPage(1); // Reset to page 1 when searching
						}}
					/>
				</div>
				<div>Loading...</div> {/* Show loading message */}
			</div>
		);
	}

	return (
		<div className="products">
			<div className="header">
				<h2>Products</h2>
				<button className="add-product-btn" onClick={handleAddProduct}>
					Add Product
				</button>
				<input
					type="text"
					placeholder="Search products..."
					className="search-bar-product"
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value); // Update search term
						setCurrentPage(1); // Reset to page 1 when searching
					}}
				/>
			</div>
			{products.length === 0 ? (
				<div className="no-data">
					No products found
				</div> /* Show message if no products */
			) : (
				<>
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Category</th>
								<th>Price</th>
								<th>Stocks</th>
								<th>View Details</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product.product_id}>
									<td>{product.product_id}</td>
									<td>{product.product_name}</td>
									<td>{product.Category.category_name}</td>
									<td>{product.price}</td>
									<td>{product.stock_quantity}</td>
									<td>
										<Link
											to={`/products/${product.product_id}`}
											className="edit-link"
										>
											View
										</Link>
									</td>
									<td>
										<Link to={`/products/edit/${product.product_id}`}>
											<button className="edit-btn">Edit</button>
										</Link>
									</td>
									<td>
										<button
											className="delete-category-button"
											onClick={() => handleDeleteProduct(product.product_id)}
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
							disabled={currentPage === 1} // Disable Prev button on first page
						>
							Prev
						</button>
						{Array.from({ length: totalPages }, (_, index) => (
							<button
								key={index}
								onClick={() => paginate(index + 1)}
								className={currentPage === index + 1 ? "active" : ""}
							>
								{index + 1}
							</button>
						))}
						<button
							onClick={() => paginate(currentPage + 1)}
							disabled={currentPage === totalPages} // Disable Next button on last page
						>
							Next
						</button>
					</div>
				</>
			)}
		</div>
	);
}

export default Products;

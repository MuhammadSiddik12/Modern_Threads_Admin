import React, { useState, useEffect } from "react";
import "../../asserts/style/Products.css";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, getAllProducts } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Products() {
	const navigate = useNavigate();

	const [products, setProducts] = useState([]); // State to store products
	const [loading, setLoading] = useState(true); // State to manage loading state
	const [currentPage, setCurrentPage] = useState(1); // State to manage current page
	const [productsPerPage] = useState(10); // Products per page
	const [totalProducts, setTotalProducts] = useState(0); // State to track total products
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			fetchProducts(); // Fetch categories whenever search input changes after a delay
		}, 500); // Delay of 500ms

		return () => clearTimeout(delayDebounceFn); // Cleanup the timeout if search changes again
	}, [searchTerm]);

	useEffect(() => {
		fetchProducts();
	}, [currentPage]);

	const fetchProducts = async () => {
		setLoading(true);
		try {
			const response = await getAllProducts(
				currentPage,
				productsPerPage,
				searchTerm
			);
			setProducts(response.data); // Set the products data
			setTotalProducts(response.total_count); // Assuming API returns total product count
			setLoading(false);
		} catch (error) {
			toast.error(error);
			setLoading(false);
		}
	};

	const handleDeleteProduct = async (id) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this product?"
		);
		if (confirmDelete) {
			try {
				await deleteProduct(id);
				setProducts(products.filter((product) => product.product_id !== id));
				toast.success("Product deleted successfully!");
			} catch (error) {
				toast.error(error);
			}
		}
	};

	// Pagination logic
	const paginate = (pageNumber) => {
		if (pageNumber >= 1 && pageNumber <= totalProducts) {
			setCurrentPage(pageNumber);
		}
	};

	if (loading) {
		return (
			<>
				<div className="header">
					<h2>Products</h2>
					<Link to="/products/add">
						<button className="add-product-btn">Add Product</button>
					</Link>
				</div>
				<div>Loading...</div>
			</>
		);
	}

	const handleAddProduct = () => {
		navigate("/products/add");
	};

	return (
		<div className="products">
			<div className="header">
				<h2>Products</h2>
				<button className="add-product-btn" onClick={handleAddProduct}>
					Add Product
				</button>
				<input
					type="text"
					placeholder="Search users..."
					className="search-bar"
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value);
						setCurrentPage(1); // Reset to page 1 when searching
					}}
				/>
			</div>
			{products.length === 0 ? (
				<div className="no-data">No products found</div>
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
							disabled={currentPage === 1}
						>
							Prev
						</button>
						{Array.from({ length: totalProducts }, (_, index) => (
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
							disabled={currentPage === totalProducts}
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

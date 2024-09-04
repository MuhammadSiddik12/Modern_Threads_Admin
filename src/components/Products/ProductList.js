import React, { useState, useEffect } from "react";
import "../../asserts/style/Products.css";
import { Link } from "react-router-dom";
import { deleteProduct, getAllProducts } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Products() {
	const [products, setProducts] = useState([]); // State to store products
	const [loading, setLoading] = useState(true); // State to manage loading state

	useEffect(() => {
		// Function to fetch products from the API
		const fetchProducts = async () => {
			try {
				const response = await getAllProducts();
				console.log("🚀 ~ fetchProducts ~ response:", response);
				setProducts(response.data); // Set the products data
				setLoading(false); // Set loading to false
			} catch (error) {
				toast.error(error);
				setLoading(false); // Set loading to false
			}
		};

		fetchProducts(); // Fetch products when component mounts
	}, []);

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

	const handleDeleteProduct = async (id) => {
		console.log("🚀 ~ handleDeleteProduct ~ id:", id);
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this Product?"
		);
		console.log("🚀 ~ handleDeleteProduct ~ confirmDelete:", confirmDelete);
		if (confirmDelete) {
			try {
				await deleteProduct(id);
				toast.success("Product deleted successfully!");
			} catch (error) {
				console.log("🚀 ~ handleDeleteProduct ~ error:", error);
				toast.error(error);
			}
		}
	};

	return (
		<div className="products">
			<div className="header">
				<h2>Products</h2>
				<Link to="/products/add">
					<button className="add-product-btn">Add Product</button>
				</Link>
			</div>
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
		</div>
	);
}

export default Products;

import React from "react";
import "../../asserts/style/Products.css";
import { Link } from "react-router-dom";

function Products() {
	const products = [
		{ id: 1, name: "Smartphone", category: "electric", price: 44000 },
		{ id: 2, name: "Laptop", category: "electric", price: 100001 },
		// Add more products here
	];

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
						<th>View Details</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product, index) => (
						<tr key={index}>
							<td>{product.id}</td>
							<td>{product.name}</td>
							<td>{product.category}</td>
							<td>{product.price}</td>
							<td>
								<Link to={`/products/${product.id}`} className="edit-link">
									View
								</Link>
							</td>
							<td>
								<Link to={`/products/edit/${product.id}`}>
									<button className="edit-btn">Edit</button>
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Products;

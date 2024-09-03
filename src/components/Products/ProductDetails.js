import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../asserts/style/ProductDetails.css";

function ProductDetails() {
	const { id } = useParams(); // Get the product ID from the URL
	const [product, setProduct] = useState(null);

	useEffect(() => {
		// Fetch product data based on the ID (replace with actual API call)
		// For now, we're using static data for demonstration
		const fetchProductData = async () => {
			const products = [
				{
					id: 1,
					name: "Smartphone",
					description: "A high-quality smartphone",
					price: "$499",
					category: "Electronics",
				},
				{
					id: 2,
					name: "Laptop",
					description: "A powerful laptop",
					price: "$999",
					category: "Computers",
				},
				// Add more products here
			];
			const productData = products.find(
				(product) => product.id === parseInt(id)
			);
			setProduct(productData);
		};

		fetchProductData();
	}, [id]);

	if (!product) {
		return <div>Loading...</div>;
	}

	return (
		<div className="product-details">
			<h2>Product Details</h2>
			<div className="product-info">
				<p>
					<strong>ID:</strong> {product.id}
				</p>
				<p>
					<strong>Name:</strong> {product.name}
				</p>
				<p>
					<strong>Description:</strong> {product.description}
				</p>
				<p>
					<strong>Price:</strong> {product.price}
				</p>
				<p>
					<strong>Category:</strong> {product.category}
				</p>
			</div>
		</div>
	);
}

export default ProductDetails;

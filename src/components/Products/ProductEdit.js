import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../asserts/style/ProductForm.css";

function EditProduct() {
	const navigate = useNavigate();
	const { id } = useParams(); // Get product ID from URL
	const [product, setProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
	});

	useEffect(() => {
		// Fetch product data by ID (replace with actual API call)
		// Simulated static data for demonstration
		const fetchProductData = async () => {
			const products = [
				{
					id: 1,
					name: "Smartphone",
					description: "A high-quality smartphone",
					price: "499",
					category: "Electronics",
				},
				{
					id: 2,
					name: "Laptop",
					description: "A powerful laptop",
					price: "999",
					category: "Computers",
				},
			];
			const productData = products.find(
				(product) => product.id === parseInt(id)
			);
			setProduct(productData);
		};

		fetchProductData();
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProduct((prevProduct) => ({
			...prevProduct,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Submit form data (replace with API call)
		console.log("Product updated:", product);
		navigate("/products");
	};

	return (
		<div className="product-form">
			<h2>Edit Product</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Name:
					<input
						type="text"
						name="name"
						value={product.name}
						onChange={handleChange}
						required
					/>
				</label>
				<label>
					Description:
					<textarea
						name="description"
						value={product.description}
						onChange={handleChange}
						required
					/>
				</label>
				<label>
					Price:
					<input
						type="number"
						name="price"
						value={product.price}
						onChange={handleChange}
						required
					/>
				</label>
				<label>
					Category:
					<input
						type="text"
						name="category"
						value={product.category}
						onChange={handleChange}
						required
					/>
				</label>
				<button type="submit">Update Product</button>
			</form>
		</div>
	);
}

export default EditProduct;

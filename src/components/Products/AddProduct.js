import React, { useState } from "react";
import "../../asserts/style/ProductForm.css";
import { useNavigate } from "react-router-dom";

function AddProduct() {
	const navigate = useNavigate();

	const [product, setProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
	});

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
		console.log("Product added:", product);

		navigate("/products");
	};

	return (
		<div className="product-form">
			<h2>Add Product</h2>
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
				<button type="submit">Add Product</button>
			</form>
		</div>
	);
}

export default AddProduct;

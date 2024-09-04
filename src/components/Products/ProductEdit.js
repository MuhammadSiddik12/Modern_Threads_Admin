import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../asserts/style/ProductForm.css";
import {
	getAllCategories,
	getProductById,
	updateProduct,
} from "../../services/api";
import { toast } from "react-toastify";

function EditProduct() {
	const navigate = useNavigate();
	const { id } = useParams(); // Get product ID from URL
	const [categories, setCategories] = useState([]); // State to hold categories

	const [product, setProduct] = useState({
		product_id: id,
		product_name: "",
		description: "",
		price: "",
		category_name: "",
		category_id: "",
		stock_quantity: 0,
	});
	const [loading, setLoading] = useState(true); // For loading state
	const [error, setError] = useState(null); // For error state

	useEffect(() => {
		// Fetch product data by ID
		const fetchProductData = async () => {
			try {
				const data = await getProductById(id);
				setProduct({
					...data.data,
					category_name: data.data.Category.category_name,
					category_id: data.data.Category.category_id,
				});

				// Fetch categories
				const categoriesResponse = await getAllCategories();
				console.log(
					"🚀 ~ fetchProductData ~ categoriesResponse:",
					categoriesResponse
				);
				setCategories(categoriesResponse.data);
				setLoading(false); // Data fetched, stop loading
			} catch (error) {
				toast.error(error);
				setError("Failed to fetch product data.");
				setLoading(false);
			}
		};

		fetchProductData();
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name == "category") {
			const findId = categories.find((f) => f.category_name == value);
			console.log("🚀 ~ handleChange ~ findId:", findId);

			setProduct((prevProduct) => ({
				...prevProduct,
				category_id: findId.category_id,
				category_name: findId.category_name,
			}));
		} else {
			setProduct((prevProduct) => ({
				...prevProduct,
				[name]: value,
			}));
		}
		console.log("🚀 ~ handleChange ~ name, value :", name, value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const update = await updateProduct(product);
			console.log("Product updated:", update);
			toast.success(update.message);
			navigate("/products"); // Redirect after successful update
		} catch (error) {
			console.error("Error updating product:", error);
			setError("Failed to update product.");
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div className="product-form">
			<h2>Edit Product</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Name:
					<input
						type="text"
						name="name"
						value={product.product_name}
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
					<select
						name="category"
						value={product.category_name}
						onChange={handleChange}
						required
					>
						<option value="">Select a category</option>
						{categories.map((category) => (
							<option key={category.category_id} value={category.category_name}>
								{category.category_name}
							</option>
						))}
					</select>
				</label>
				<button type="submit">Update Product</button>
			</form>
		</div>
	);
}

export default EditProduct;

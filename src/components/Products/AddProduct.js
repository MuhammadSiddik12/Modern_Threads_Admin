import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	addProduct,
	getAllCategories,
	uploadImage,
} from "../../services/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProduct() {
	const navigate = useNavigate(); // Hook for programmatic navigation
	const [categories, setCategories] = useState([]); // State to store categories
	const [product, setProduct] = useState({
		product_name: "",
		description: "",
		price: "",
		category_name: "",
		category_id: "",
		stock_quantity: 0,
		product_images: null,
	}); // State to store product details
	const [loading, setLoading] = useState(false); // State to manage loading state

	// Handle changes to form inputs
	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "category") {
			const selectedCategory = categories.find(
				(cat) => cat.category_name === value
			);
			if (selectedCategory) {
				setProduct((prevProduct) => ({
					...prevProduct,
					category_id: selectedCategory.category_id,
					category_name: selectedCategory.category_name,
				}));
			}
		} else if (name === "product_images") {
			setProduct((prevProduct) => ({
				...prevProduct,
				product_images: e.target.files[0],
			}));
		} else {
			setProduct((prevProduct) => ({
				...prevProduct,
				[name]: value,
			}));
		}
	};

	// Fetch categories when component mounts
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await getAllCategories(1, 100, ""); // Fetch categories with pagination
				setCategories(response.data); // Update categories state
			} catch (error) {
				toast.error("Failed to fetch categories: " + error.message); // Show error message if fetching fails
			}
		};

		fetchCategories();
	}, []);

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		setLoading(true); // Set loading state to true

		try {
			let imageUrl = null;
			if (product.product_images) {
				const formDataImage = new FormData();
				formDataImage.append("image", product.product_images);

				const imageResponse = await uploadImage(formDataImage); // Upload image
				imageUrl = imageResponse.filePath; // Get image URL from response
			}

			const formDataProduct = {
				...product,
				product_images: imageUrl ? [imageUrl] : [], // Add image URL to product data
			};

			await addProduct(formDataProduct); // Add product
			toast.success("Product added successfully!"); // Show success message
			navigate("/products"); // Redirect to products page
		} catch (error) {
			toast.error("Failed to add product: " + error.message); // Show error message if adding product fails
		} finally {
			setLoading(false); // Set loading state to false
		}
	};

	return (
		<div className="product-form">
			<h2>Add Product</h2>
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<label>
					Name:
					<input
						type="text"
						name="product_name"
						value={product.product_name}
						onChange={handleChange} // Update product_name state on change
						required
					/>
				</label>
				<label>
					Description:
					<textarea
						name="description"
						value={product.description}
						onChange={handleChange} // Update description state on change
						required
					/>
				</label>
				<label>
					Price:
					<input
						type="number"
						name="price"
						value={product.price}
						onChange={handleChange} // Update price state on change
						required
					/>
				</label>
				<label>
					Stock Quantity:
					<input
						type="number"
						name="stock_quantity"
						value={product.stock_quantity}
						onChange={handleChange} // Update stock_quantity state on change
						required
					/>
				</label>
				<label>
					Category:
					<select
						name="category"
						value={product.category_name}
						onChange={handleChange} // Update category_name and category_id state on change
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
				<label>
					Image:
					<input
						type="file"
						name="product_images"
						onChange={handleChange} // Update product_images state on file input change
						accept="image/*"
					/>
				</label>
				<button type="submit" disabled={loading}>
					{loading ? "Adding..." : "Add Product"}{" "}
					{/* Display button text based on loading state */}
				</button>
			</form>
		</div>
	);
}

export default AddProduct;

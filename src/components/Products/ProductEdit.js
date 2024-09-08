import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	getAllCategories,
	getProductById,
	updateProduct,
	uploadImage,
} from "../../services/ApiService";
import { toast } from "react-toastify";
import "../../asserts/style/Product/ProductForm.css";

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
		product_images: "", // Store image URL or reference
	});
	const [image, setImage] = useState(null); // State for image file
	const [loading, setLoading] = useState(true); // For loading state
	const [error, setError] = useState(null); // For error state

	useEffect(() => {
		const fetchProductData = async () => {
			try {
				const { data } = await getProductById(id);
				setProduct({
					...data,
					category_name: data?.Category?.category_name || "",
					category_id: data?.Category?.category_id || "",
				});

				const { data: categoriesResponse } = await getAllCategories(1, 100, "");
				setCategories(categoriesResponse);
				setLoading(false); // Data fetched, stop loading
			} catch (error) {
				toast.error("Error fetching product data: " + error.message);
				setError("Failed to fetch product data.");
				setLoading(false);
			}
		};

		fetchProductData();
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "category") {
			const findId = categories.find((f) => f.category_name === value);
			setProduct((prevProduct) => ({
				...prevProduct,
				category_id: findId?.category_id || "",
				category_name: findId?.category_name || "",
			}));
		} else if (name === "image") {
			setImage(e.target.files[0]); // Handle image file
		} else {
			setProduct((prevProduct) => ({
				...prevProduct,
				[name]: value,
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			let imageUrl = product.product_images;
			if (image) {
				const formData = new FormData();
				formData.append("image", image);

				try {
					const { data } = await uploadImage(formData);
					imageUrl = data.filePath; // Assuming the API returns the image URL
				} catch (error) {
					toast.error("Failed to upload image.");
					throw error;
				}
			}

			const updatedProduct = {
				...product,
				product_images: [imageUrl],
			};

			const { message } = await updateProduct(updatedProduct); // Call API to update product
			toast.success(message);
			navigate("/products"); // Redirect after successful update
		} catch (error) {
			console.error("Error updating product:", error);
			toast.error("Failed to update product: " + error.message);
			setError("Failed to update product.");
		} finally {
			setLoading(false);
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
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<label>
					Name:
					<input
						type="text"
						name="product_name"
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
				<label>
					Image:
					<input
						type="file"
						name="image"
						onChange={handleChange}
						accept="image/*" // Accept only images
					/>
				</label>
				<button type="submit">Update Product</button>
			</form>
		</div>
	);
}

export default EditProduct;

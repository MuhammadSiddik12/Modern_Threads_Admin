import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct, getAllCategories, uploadImage } from "../../services/api"; // Import the uploadImage function
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProduct() {
	const navigate = useNavigate();
	const [categories, setCategories] = useState([]);
	const [product, setProduct] = useState({
		product_name: "",
		description: "",
		price: "",
		category_name: "",
		category_id: "",
		stock_quantity: 0,
		product_images: null,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "category") {
			const findId = categories.find((f) => f.category_name === value);
			setProduct((prevProduct) => ({
				...prevProduct,
				category_id: findId.category_id,
				category_name: findId.category_name,
			}));
		} else if (name === "product_images") {
			const file = e.target.files[0];
			setProduct((prevProduct) => ({
				...prevProduct,
				product_images: file,
			}));
		} else {
			setProduct((prevProduct) => ({
				...prevProduct,
				[name]: value,
			}));
		}
	};

	useEffect(() => {
		const fetchProductData = async () => {
			try {
				const categoriesResponse = await getAllCategories();
				setCategories(categoriesResponse.data);
			} catch (error) {
				toast.error(error.message);
			}
		};

		fetchProductData();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			let imageUrl = null;
			if (product.product_images) {
				// Upload image
				const formDataImage = new FormData();
				formDataImage.append("image", product.product_images);

				const imageResponse = await uploadImage(formDataImage);
				imageUrl = imageResponse.data.filePath; // Assuming the response contains the image URL
			}

			// Submit product details with image URL
			const formDataProduct = {
				...product,
				product_images: [imageUrl],
			};

			await addProduct(formDataProduct);
			toast.success("Product added successfully!");
			navigate("/products"); // Redirect after successful addition
		} catch (error) {
			console.error("Error adding product:", error);
			toast.error(error.message);
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
					Stock Quantity:
					<input
						type="number"
						name="stock_quantity"
						value={product.stock_quantity}
						onChange={handleChange}
						required
					/>
				</label>
				<label>
					Category:{"    "}
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
						name="product_images"
						onChange={handleChange}
						accept="image/*"
					/>
				</label>
				<button type="submit">Add Product</button>
			</form>
		</div>
	);
}

export default AddProduct;

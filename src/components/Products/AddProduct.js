import React, { useEffect, useState } from "react";
import "../../asserts/style/ProductForm.css";
import { useNavigate } from "react-router-dom";
import { addProduct, getAllCategories } from "../../services/api";
import { toast } from "react-toastify";

function AddProduct() {
	const navigate = useNavigate();
	const [categories, setCategories] = useState([]); // State to hold categories
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
		} else if (name === "image") {
			// Handle image file
			const file = e.target.files[0];
			console.log("🚀 ~ handleChange ~ file:", file.name);
			setProduct((prevProduct) => ({
				...prevProduct,
				product_images: file.name,
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

		// const formData = new FormData();
		// formData.append("product_name", product.product_name);
		// formData.append("description", product.description);
		// formData.append("price", product.price);
		// formData.append("category_id", product.category_id);
		// formData.append("stock_quantity", product.stock_quantity);
		// if (product.image) {
		// 	formData.append("image", product.image); // Append image file if it exists
		// }

		try {
			const add = await addProduct(product); // Send form data with image
			toast.success(add.message);
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
				<button type="submit">Add Product</button>
			</form>
		</div>
	);
}

export default AddProduct;

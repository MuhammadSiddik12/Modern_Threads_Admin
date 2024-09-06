import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct, getAllCategories, uploadImage } from "../../services/api";
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
	const [loading, setLoading] = useState(false);

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

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await getAllCategories(1, 100, "");
				setCategories(response.data);
			} catch (error) {
				toast.error("Failed to fetch categories: " + error.message);
			}
		};

		fetchCategories();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			let imageUrl = null;
			if (product.product_images) {
				const formDataImage = new FormData();
				formDataImage.append("image", product.product_images);

				const imageResponse = await uploadImage(formDataImage);
				imageUrl = imageResponse.filePath;
			}

			const formDataProduct = {
				...product,
				product_images: imageUrl ? [imageUrl] : [],
			};

			await addProduct(formDataProduct);
			toast.success("Product added successfully!");
			navigate("/products");
		} catch (error) {
			toast.error("Failed to add product: " + error.message);
		} finally {
			setLoading(false);
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
						name="product_images"
						onChange={handleChange}
						accept="image/*"
					/>
				</label>
				<button type="submit" disabled={loading}>
					{loading ? "Adding..." : "Add Product"}
				</button>
			</form>
		</div>
	);
}

export default AddProduct;

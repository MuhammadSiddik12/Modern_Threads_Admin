import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../asserts/style/ProductDetails.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProductById } from "../../services/api";

function ProductDetails() {
	const { id } = useParams(); // Get the product ID from the URL
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch product data based on the ID (replace with actual API call)
		// For now, we're using static data for demonstration
		const fetchProductData = async () => {
			setLoading(true); // Start loading
			try {
				const data = await getProductById(id);

				if (data.data) {
					setProduct(data.data); // Assuming the response structure has a `categories` field
				} else {
					toast.error("Data not found");
				}
			} catch (error) {
				toast.error(error);
			} finally {
				setLoading(false); // Stop loading
			}
		};

		fetchProductData();
	}, [id]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!product) {
		return <div>Product not found</div>;
	}

	return (
		<div className="product-details">
			<h2>Product Details</h2>
			<div className="product-info">
				<p>
					<strong>ID:</strong> {product.product_id}
				</p>
				<p>
					<strong>Name:</strong> {product.product_name}
				</p>
				<p>
					<strong>Description:</strong> {product.description}
				</p>
				<p>
					<strong>Price:</strong> {product.price}
				</p>
				<p>
					<strong>Category:</strong> {product.Category.category_name}
				</p>
				<p>
					<strong>Stocks:</strong> {product.stock_quantity}
				</p>
			</div>
		</div>
	);
}

export default ProductDetails;

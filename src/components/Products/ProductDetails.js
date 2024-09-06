import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../asserts/style/Product/ProductDetails.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProductById } from "../../services/api";

function ProductDetails() {
	const { id } = useParams(); // Get the product ID from the URL
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProductData = async () => {
			setLoading(true); // Start loading
			try {
				const data = await getProductById(id);

				if (data.data) {
					setProduct(data.data); // Assuming the response structure has a `data` field
				} else {
					toast.error("Product not found");
				}
			} catch (error) {
				toast.error("Error fetching product: " + error.message);
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

	const imageUrl =
		product.product_images && product.product_images.length
			? `http://localhost:3001${product.product_images[0]}`
			: "https://via.placeholder.com/300";

	return (
		<div className="product-details">
			<h2>Product Details</h2>
			<div className="product-info">
				<img
					src={imageUrl}
					alt={product.product_name}
					className="product-image"
				/>
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
					<strong>Price:</strong> ₹{product.price}
				</p>
				<p>
					<strong>Category:</strong> {product.Category?.category_name || "N/A"}
				</p>
				<p>
					<strong>Stocks:</strong> {product.stock_quantity}
				</p>
			</div>
		</div>
	);
}

export default ProductDetails;

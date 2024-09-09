import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../asserts/style/Product/ProductDetails.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProductById } from "../../services/ApiService";

function ProductDetails() {
	const { id } = useParams(); // Get the product ID from the URL parameters
	const [product, setProduct] = useState(null); // State to store product details
	const [loading, setLoading] = useState(true); // State to manage loading state

	useEffect(() => {
		const fetchProductData = async () => {
			setLoading(true); // Set loading state to true before fetching data
			try {
				const data = await getProductById(id); // Fetch product data by ID

				if (data.data) {
					setProduct(data.data); // Update product state with fetched data
				} else {
					toast.error("Product not found"); // Show error if product is not found
				}
			} catch (error) {
				toast.error("Error fetching product: " + error.message); // Show error if there's an issue with the request
			} finally {
				setLoading(false); // Set loading state to false after data fetching is complete
			}
		};

		fetchProductData();
	}, [id]); // Dependency array: fetch data when `id` changes

	if (loading) {
		return <div>Loading...</div>; // Display loading message while data is being fetched
	}

	if (!product) {
		return <div>Product not found</div>; // Display message if no product data is available
	}

	const imageUrl =
		product.product_images && product.product_images.length
			? `http://localhost:3001${product.product_images[0]}` // Construct image URL if product images exist
			: "https://via.placeholder.com/300"; // Fallback image URL if no images are available

	return (
		<div className="product-details">
			<h2>Product Details</h2>
			<div className="product-info">
				<img
					src={imageUrl}
					alt={product.product_name} // Alt text for the image
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
					<strong>Category:</strong> {product.Category?.category_name || "N/A"}{" "}
					{/* Optional chaining to handle undefined category */}
				</p>
				<p>
					<strong>Stocks:</strong> {product.stock_quantity}
				</p>
			</div>
		</div>
	);
}

export default ProductDetails;

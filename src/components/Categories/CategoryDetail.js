import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../asserts/style/CategoryDetail.css";
import { getCategoryById } from "../../services/api"; // Import the API function
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CategoryDetail() {
	const { id } = useParams(); // Get category ID from URL
	const [category, setCategory] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const data = await getCategoryById(id); // Fetch category details by ID
				setCategory(data.data); // Set the fetched data to category state
			} catch (error) {
				console.error("Error fetching category:", error);
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchCategory();
	}, [id]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!category) {
		return <div>No category data found.</div>;
	}

	const defaultImage = "https://via.placeholder.com/300"; // Placeholder image URL

	return (
		<div className="category-detail">
			<h2>Category Details</h2>
			<div className="category-info">
				<img
					src={
						`http://localhost:3001${category.category_image}` || defaultImage
					}
					alt={category.category_name}
					className="category-image"
				/>
				<p>
					<strong>Id:</strong> {category.category_id}
				</p>
				<p>
					<strong>Name:</strong> {category.category_name}
				</p>
			</div>
		</div>
	);
}

export default CategoryDetail;

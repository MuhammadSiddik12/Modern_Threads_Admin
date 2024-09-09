import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../asserts/style/Category/CategoryDetail.css";
import { getCategoryById, IMAGE_BASE_URL } from "../../services/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CategoryDetail() {
	const { id } = useParams(); // Get category ID from URL parameters
	const [category, setCategory] = useState(null); // State to store category details
	const [loading, setLoading] = useState(true); // State to manage loading state

	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const { data } = await getCategoryById(id); // Fetch category details by ID
				setCategory(data); // Set the fetched data to category state
			} catch (error) {
				console.error("Error fetching category:", error); // Log error
				toast.error("Failed to fetch category details. Please try again."); // Show error message
			} finally {
				setLoading(false); // Set loading state to false after fetching
			}
		};

		fetchCategory();
	}, [id]); // Dependency array: refetch if ID changes

	if (loading) {
		return <div>Loading...</div>; // Show loading message while fetching data
	}

	if (!category) {
		return <div>No category data found.</div>; // Show message if no category data is found
	}

	const defaultImage = "https://via.placeholder.com/300"; // Default image URL

	return (
		<div className="category-detail">
			<h2>Category Details</h2>
			<div className="category-info">
				<img
					src={
						category.category_image
							? `${IMAGE_BASE_URL}${category.category_image}` // Use image URL from API response
							: defaultImage // Fallback to default image
					}
					alt={category.category_name || "Category"} // Alt text for image
					className="category-image"
				/>
				<p>
					<strong>ID:</strong> {category.category_id}
				</p>
				<p>
					<strong>Name:</strong> {category.category_name}
				</p>
			</div>
		</div>
	);
}

export default CategoryDetail;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../asserts/style/CategoryDetail.css";

function CategoryDetail() {
	const { id } = useParams(); // Get category ID from URL
	const [category, setCategory] = useState(null);

	useEffect(() => {
		// Simulate fetching category data based on ID
		const fetchCategory = async () => {
			try {
				// Replace with actual API call
				// const response = await fetch(`/api/categories/${id}`);
				// const data = await response.json();
				setCategory({ id: 1, name: "Electronics" });
			} catch (error) {
				console.error("Error fetching category:", error);
			}
		};

		fetchCategory();
	}, [id]);

	if (!category) {
		return <div>Loading...</div>;
	}

	return (
		<div className="category-detail">
			<h2>Category Details</h2>
			<div className="category-info">
				<p>
					<strong>Id:</strong> {category.id}
				</p>
				<p>
					<strong>Name:</strong> {category.name}
				</p>
			</div>
		</div>
	);
}

export default CategoryDetail;

// src/api.js
const BASE_URL = "http://localhost:3001/admin";
import axios from "axios";

// src/auth.js

export const loginUser = async (email, password) => {
	try {
		const response = await axios.post(
			`${BASE_URL}/adminLogin`,
			JSON.stringify({
				admin_email: email,
				admin_password: password,
			}),
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		return response.data;
	} catch (error) {
		throw error.response?.data?.message || error.message;
	}
};

// Fetch all categories
export const getAllCategories = async (page, limit, searchTerm) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.get(
			`${BASE_URL}/category/getAllCategories?page=${page}&limit=${limit}&search=${searchTerm}`,
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		);

		return await response.data;
	} catch (error) {
		console.error("Error fetching categories:", error);
		throw error.response?.data?.message || error.message;
	}
};

// Delete a category
export const deleteCategory = async (id) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.delete(
			`${BASE_URL}/category/deleteCategory?category_id=${id}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return await response.data;
	} catch (error) {
		console.error("Error deleting category:", error);
		throw error.response?.data?.message || error.message;
	}
};

export const addCategory = async (category) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.post(
			"http://localhost:3001/admin/category/createCategory",
			category,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		throw error.response?.data?.message || error.message;
	}
};

export const getCategoryById = async (categoryId) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.get(
			`http://localhost:3001/admin/category/getCategoryDetails?category_id=${categoryId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error("Error getting category:", error);
		throw error.response?.data?.message || error.message;
	}
};

export const updateCategory = async (category) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.put(
			"http://localhost:3001/admin/category/updateCategory",
			category,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`, // Pass the token for authentication
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error("Error updating category:", error);
		throw error.response?.data?.message || error.message;
	}
};

// Fetch all users
export const getAllUsers = async (page, limit, searchTerm) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.get(
			`${BASE_URL}/users/getAllUsers?page=${page}&limit=${limit}&search=${searchTerm}`,
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error("Error fetching users:", error);
		throw error.response?.data?.message || error.message;
	}
};

export const getUserById = async (user_id) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.get(
			`${BASE_URL}/users/getUserDetails?user_id=${user_id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error("Error getting users:", error);
		throw error.response?.data?.message || error.message;
	}
};

export const getAllProducts = async (page, limit, searchTerm) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.get(
			`${BASE_URL}/products/getAllProducts?page=${page}&limit=${limit}&search=${searchTerm}`,
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error("Error fetching product:", error);
		throw error.response?.data?.message || error.message;
	}
};

export const getProductById = async (id) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.get(
			`http://localhost:3001/admin/products/getProductById?product_id=${id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error("Error getting product:", error);
		throw error.response?.data?.message || error.message;
	}
};

export const updateProduct = async (data) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.put(
			"http://localhost:3001/admin/products/updateProduct",
			data,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`, // Pass the token for authentication
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error("Error updating product:", error);
		throw error.response?.data?.message || error.message;
	}
};

export const deleteProduct = async (id) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.delete(
			`${BASE_URL}/products/deleteProduct?product_id=${id}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return await response.data;
	} catch (error) {
		console.error("Error deleting product:", error);
		throw error.response?.data?.message || error.message;
	}
};

export const addProduct = async (data) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.post(
			"http://localhost:3001/admin/products/addProduct",
			data,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		throw error.response?.data?.message || error.message;
	}
};

export const fetchOrders = async (page, limit, searchTerm) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.get(
			`http://localhost:3001/admin/orders/getAllOrders?page=${page}&limit=${limit}&search=${searchTerm}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching orders:", error);
		throw error.response?.data?.message || error.message;
	}
};

export const fetchOrderById = async (orderId) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.get(
			`http://localhost:3001/admin/orders/getOrderDetails?order_id=${orderId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching order by ID:", error);
		throw error.response?.data?.message || error.message;
	}
};

export const getPayments = async (page, limit, searchTerm) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.get(
			`http://localhost:3001/admin/payments/getAllPayments?page=${page}&limit=${limit}&search=${searchTerm}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		throw error.response?.data?.message || error.message;
	}
};

export const getPaymentById = async (paymentId) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.get(
			`http://localhost:3001/admin/payments/getPaymentDetails?payment_id=${paymentId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error("Error getting category:", error);
		throw error.response?.data?.message || error.message;
	}
};

export const logout = async () => {
	try {
		localStorage.removeItem("authToken");
	} catch (error) {
		throw error.message ? error.message : "Logout failed";
	}
};

export const getAdminDetails = async () => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.get(`${BASE_URL}/getAdminDetails`, {
			headers: {
				Authorization: "Bearer " + token,
			},
		});

		return response.data;
	} catch (error) {
		console.error("Error fetching admin:", error);
		throw error.response?.data?.message || error.message;
	}
};

export const updateAdminDetails = async (admin) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.put(
			"http://localhost:3001/admin/editAdminProfile",
			admin,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`, // Pass the token for authentication
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error("Error updating product:", error);
		throw error.response?.data?.message || error.message;
	}
};

export const dashboardDetails = async () => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.get(
			"http://localhost:3001/admin/dashboardDetails",
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`, // Pass the token for authentication
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching dashboard details:", error);
		throw error.response?.data?.message || error.message;
	}
};

export const uploadImage = (formData) => {
	return axios.post("http://localhost:3001/uploadImage", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

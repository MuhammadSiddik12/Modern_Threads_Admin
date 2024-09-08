// src/api.js
import axios from "axios";

const BASE_URL = "https://ignou-project-backend.onrender.com/admin";
export const IMAGE_BASE_URL = "https://ignou-project-backend.onrender.com";

const getAuthHeaders = () => {
	const token = localStorage.getItem("authToken");
	return {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
};

// Authentication
export const loginUser = async (email, password) => {
	try {
		const response = await axios.post(
			`${BASE_URL}/adminLogin`,
			{
				admin_email: email,
				admin_password: password,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

// Categories
export const getAllCategories = async (page, limit, searchTerm) => {
	try {
		const response = await axios.get(`${BASE_URL}/category/getAllCategories`, {
			params: { page, limit, search: searchTerm },
			...getAuthHeaders(),
		});
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const deleteCategory = async (id) => {
	try {
		const response = await axios.delete(`${BASE_URL}/category/deleteCategory`, {
			params: { category_id: id },
			...getAuthHeaders(),
		});
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const addCategory = async (category) => {
	try {
		const response = await axios.post(
			`${BASE_URL}/category/createCategory`,
			category,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const getCategoryById = async (categoryId) => {
	try {
		const response = await axios.get(
			`${BASE_URL}/category/getCategoryDetails`,
			{
				params: { category_id: categoryId },
				...getAuthHeaders(),
			}
		);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const updateCategory = async (category) => {
	try {
		const response = await axios.put(
			`${BASE_URL}/category/updateCategory`,
			category,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

// Users
export const getAllUsers = async (page, limit, searchTerm) => {
	try {
		const response = await axios.get(`${BASE_URL}/users/getAllUsers`, {
			params: { page, limit, search: searchTerm },
			...getAuthHeaders(),
		});
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const getUserById = async (userId) => {
	try {
		const response = await axios.get(`${BASE_URL}/users/getUserDetails`, {
			params: { user_id: userId },
			...getAuthHeaders(),
		});
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

// Products
export const getAllProducts = async (page, limit, searchTerm) => {
	try {
		const response = await axios.get(`${BASE_URL}/products/getAllProducts`, {
			params: { page, limit, search: searchTerm },
			...getAuthHeaders(),
		});
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const getProductById = async (id) => {
	try {
		const response = await axios.get(`${BASE_URL}/products/getProductById`, {
			params: { product_id: id },
			...getAuthHeaders(),
		});
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const updateProduct = async (data) => {
	try {
		const response = await axios.put(
			`${BASE_URL}/products/updateProduct`,
			data,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const deleteProduct = async (id) => {
	try {
		const response = await axios.delete(`${BASE_URL}/products/deleteProduct`, {
			params: { product_id: id },
			...getAuthHeaders(),
		});
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const addProduct = async (data) => {
	try {
		const response = await axios.post(
			`${BASE_URL}/products/addProduct`,
			data,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

// Orders
export const fetchOrders = async (page, limit, searchTerm) => {
	try {
		const response = await axios.get(`${BASE_URL}/orders/getAllOrders`, {
			params: { page, limit, search: searchTerm },
			...getAuthHeaders(),
		});
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const fetchOrderById = async (orderId) => {
	try {
		const response = await axios.get(`${BASE_URL}/orders/getOrderDetails`, {
			params: { order_id: orderId },
			...getAuthHeaders(),
		});
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

// Payments
export const getPayments = async (page, limit, searchTerm) => {
	try {
		const response = await axios.get(`${BASE_URL}/payments/getAllPayments`, {
			params: { page, limit, search: searchTerm },
			...getAuthHeaders(),
		});
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const getPaymentById = async (paymentId) => {
	try {
		const response = await axios.get(`${BASE_URL}/payments/getPaymentDetails`, {
			params: { payment_id: paymentId },
			...getAuthHeaders(),
		});
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

// Admin
export const getAdminDetails = async () => {
	try {
		const response = await axios.get(
			`${BASE_URL}/getAdminDetails`,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const updateAdminDetails = async (admin) => {
	try {
		const response = await axios.put(
			`${BASE_URL}/editAdminProfile`,
			admin,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const dashboardDetails = async () => {
	try {
		const response = await axios.get(
			`${BASE_URL}/dashboardDetails`,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const uploadImage = async (formData) => {
	try {
		const response = await axios.post(
			`${IMAGE_BASE_URL}/uploadImage`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

// Helper function to handle errors
const handleError = (error) => {
	if (error.response?.status === 401) {
		// Clear local storage and redirect to login
		localStorage.removeItem("authToken");
		window.location.href = "/login"; // Redirect to login page
	} else {
		console.error("API error:", error);
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

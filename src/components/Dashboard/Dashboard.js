import React, { useEffect, useState } from "react";
import "../../asserts/style/Dashboard/Dashboard.css";
import { dashboardDetails } from "../../services/ApiService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
	const [stats, setStats] = useState({
		totalUsers: 0,
		totalProducts: 0,
		totalOrders: 0,
		totalPayments: 0,
		totalCategory: 0,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchDashboardDetails = async () => {
			try {
				const res = await dashboardDetails();
				setStats(res.data);
			} catch (error) {
				setError(error.message || "Error fetching dashboard details");
				toast.error(error.message || "Error fetching dashboard details");
			} finally {
				setLoading(false);
			}
		};

		fetchDashboardDetails();
	}, []);

	if (loading) {
		return <div className="loading">Loading...</div>;
	}

	if (error) {
		return <div className="error">Error: {error}</div>;
	}

	return (
		<div className="dashboard">
			<h2>Dashboard</h2>
			<div className="stats">
				<Link to="/users" className="stat-link">
					<div className="stat-card">
						<h3>Total Users</h3>
						<p>{stats.totalUsers}</p>
					</div>
				</Link>
				<Link to="/categories" className="stat-link">
					<div className="stat-card">
						<h3>Total Categories</h3>
						<p>{stats.totalCategory}</p>
					</div>
				</Link>
				<Link to="/products" className="stat-link">
					<div className="stat-card">
						<h3>Total Products</h3>
						<p>{stats.totalProducts}</p>
					</div>
				</Link>
				<Link to="/orders" className="stat-link">
					<div className="stat-card">
						<h3>Total Orders</h3>
						<p>{stats.totalOrders}</p>
					</div>
				</Link>
				<Link to="/payments" className="stat-link">
					<div className="stat-card">
						<h3>Total Payments</h3>
						<p>{stats.totalPayments}</p>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Dashboard;

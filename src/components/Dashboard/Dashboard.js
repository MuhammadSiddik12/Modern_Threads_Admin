import React, { useEffect, useState } from "react";
import "../../asserts/style/Dashboard.css";
import { dashboardDetails } from "../../services/api";
import { Link } from "react-router-dom";

function Dashboard() {
	const [stats, setStats] = useState({
		totalUsers: 0,
		totalProducts: 0,
		totalOrders: 0,
		totalPayments: 0,
	});

	useEffect(() => {
		// Fetch the dashboard details from the backend API
		const fetchDashboardDetails = async () => {
			const res = await dashboardDetails();
			setStats(res.data);
		};

		fetchDashboardDetails();
	}, []);

	return (
		<div className="dashboard">
			<h2>Dashboard</h2>
			<div className="stats">
				<Link to="/users">
					<div className="stat-card">
						<h3>Total Users</h3>
						<p>{stats.totalUsers}</p>
					</div>
				</Link>
				<Link to="/products">
					<div className="stat-card">
						<h3>Total Products</h3>
						<p>{stats.totalProducts}</p>
					</div>
				</Link>
				<Link to="/orders">
					<div className="stat-card">
						<h3>Total Orders</h3>
						<p>{stats.totalOrders}</p>
					</div>
				</Link>
				<Link to="/payments">
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

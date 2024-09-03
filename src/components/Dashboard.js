import React from "react";
import "../asserts/style/Dashboard.css";

function Dashboard() {
	return (
		<div className="dashboard">
			<h2>Dashboard</h2>
			<div className="stats">
				<div className="stat-card">
					<h3>Total Users</h3>
					<p>1200</p>
				</div>
				<div className="stat-card">
					<h3>Total Products</h3>
					<p>300</p>
				</div>
				<div className="stat-card">
					<h3>Total Orders</h3>
					<p>500</p>
				</div>
				<div className="stat-card">
					<h3>Total Payments</h3>
					<p>$50,000</p>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../asserts/style/Sidebar.css";
import {
	FaHome,
	FaUsers,
	FaBox,
	FaTags,
	FaReceipt,
	FaCreditCard,
	FaUser,
} from "react-icons/fa";

function Sidebar() {
	// State to manage sidebar visibility
	const [isOpen, setIsOpen] = useState(false);

	// Function to toggle the sidebar open/close state
	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			{/* Sidebar toggle button */}
			<div
				className="sidebar-toggle"
				onClick={toggleSidebar}
				aria-label="Toggle Sidebar"
				aria-expanded={isOpen}
			>
				{/* Toggle button bars */}
				<span></span>
				<span></span>
				<span></span>
			</div>
			{/* Sidebar container with conditional class based on `isOpen` state */}
			<div className={`sidebar ${isOpen ? "open" : ""}`}>
				<ul>
					{/* Dashboard link */}
					<li>
						<Link to="/" onClick={toggleSidebar} aria-label="Dashboard">
							<FaHome className="sidebar-icon" /> Dashboard
						</Link>
					</li>
					{/* Users link */}
					<li>
						<Link to="/users" onClick={toggleSidebar} aria-label="Users">
							<FaUsers className="sidebar-icon" /> Users
						</Link>
					</li>
					{/* Products link */}
					<li>
						<Link to="/products" onClick={toggleSidebar} aria-label="Products">
							<FaBox className="sidebar-icon" /> Products
						</Link>
					</li>
					{/* Categories link */}
					<li>
						<Link
							to="/categories"
							onClick={toggleSidebar}
							aria-label="Categories"
						>
							<FaTags className="sidebar-icon" /> Categories
						</Link>
					</li>
					{/* Orders link */}
					<li>
						<Link to="/orders" onClick={toggleSidebar} aria-label="Orders">
							<FaReceipt className="sidebar-icon" /> Orders
						</Link>
					</li>
					{/* Payments link */}
					<li>
						<Link to="/payments" onClick={toggleSidebar} aria-label="Payments">
							<FaCreditCard className="sidebar-icon" /> Payments
						</Link>
					</li>
					{/* Reports link */}
					<li>
						<Link to="/reports" onClick={toggleSidebar} aria-label="Reports">
							<FaReceipt className="sidebar-icon" /> Reports
						</Link>
					</li>
					{/* Profile link */}
					<li>
						<Link to="/profile" onClick={toggleSidebar} aria-label="Profile">
							<FaUser className="sidebar-icon" /> Profile
						</Link>
					</li>
				</ul>
			</div>
		</>
	);
}

export default Sidebar;

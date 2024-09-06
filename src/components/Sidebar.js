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
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<div
				className="sidebar-toggle"
				onClick={toggleSidebar}
				aria-label="Toggle Sidebar"
				aria-expanded={isOpen}
			>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<div className={`sidebar ${isOpen ? "open" : ""}`}>
				<ul>
					<li>
						<Link to="/" onClick={toggleSidebar} aria-label="Dashboard">
							<FaHome className="sidebar-icon" /> Dashboard
						</Link>
					</li>
					<li>
						<Link to="/users" onClick={toggleSidebar} aria-label="Users">
							<FaUsers className="sidebar-icon" /> Users
						</Link>
					</li>
					<li>
						<Link to="/products" onClick={toggleSidebar} aria-label="Products">
							<FaBox className="sidebar-icon" /> Products
						</Link>
					</li>
					<li>
						<Link
							to="/categories"
							onClick={toggleSidebar}
							aria-label="Categories"
						>
							<FaTags className="sidebar-icon" /> Categories
						</Link>
					</li>
					<li>
						<Link to="/orders" onClick={toggleSidebar} aria-label="Orders">
							<FaReceipt className="sidebar-icon" /> Orders
						</Link>
					</li>
					<li>
						<Link to="/payments" onClick={toggleSidebar} aria-label="Payments">
							<FaCreditCard className="sidebar-icon" /> Payments
						</Link>
					</li>
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

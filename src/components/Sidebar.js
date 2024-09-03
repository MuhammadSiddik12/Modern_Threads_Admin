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
} from "react-icons/fa"; // Import icons

function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<div className="sidebar-toggle" onClick={toggleSidebar}>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<div className={`sidebar ${isOpen ? "open" : ""}`}>
				<ul>
					<li>
						<Link to="/" onClick={toggleSidebar}>
							<FaHome className="sidebar-icon" /> Dashboard
						</Link>
					</li>
					<li>
						<Link to="/users" onClick={toggleSidebar}>
							<FaUsers className="sidebar-icon" /> Users
						</Link>
					</li>
					<li>
						<Link to="/products" onClick={toggleSidebar}>
							<FaBox className="sidebar-icon" /> Products
						</Link>
					</li>
					<li>
						<Link to="/categories" onClick={toggleSidebar}>
							<FaTags className="sidebar-icon" /> Categories
						</Link>
					</li>
					<li>
						<Link to="/orders" onClick={toggleSidebar}>
							<FaReceipt className="sidebar-icon" /> Orders
						</Link>
					</li>
					<li>
						<Link to="/payments" onClick={toggleSidebar}>
							<FaCreditCard className="sidebar-icon" /> Payments
						</Link>
					</li>
				</ul>
			</div>
		</>
	);
}

export default Sidebar;

import React, { useState } from "react";
import "../asserts/style/Header.css";
import { logout } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Header({ isLogin }) {
	const [isNavOpen, setIsNavOpen] = useState(false);

	const toggleNav = () => {
		setIsNavOpen(!isNavOpen);
	};

	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logout(); // Call logout function
			toast.success("Logged out successfully");
			navigate("/login"); // Redirect to login page
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} catch (error) {
			toast.error("Logout failed");
		}
	};

	return (
		<header className="admin-header">
			<div className="logo">
				<h1>Modern Threads</h1>
			</div>
			<div className="hamburger" onClick={toggleNav}>
				<span></span>
				<span></span>
				<span></span>
			</div>
			{!isLogin ? (
				<nav className={`admin-nav ${isNavOpen ? "open" : ""}`}>
					<ul>
						<button className="logout-btn" onClick={handleLogout}>
							Logout
						</button>
					</ul>
				</nav>
			) : (
				""
			)}
		</header>
	);
}

export default Header;

import React, { useState } from "react";
import "../asserts/style/Header.css";
import { logout } from "../services/ApiService";
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
			navigate("/login"); // Redirect to login page
			setTimeout(() => {
				window.location.reload();
			}, 800);
			toast.success("Logged out successfully");
		} catch (error) {
			toast.error("Logout failed");
		}
	};

	return (
		<header className="admin-header">
			<div className="logo">
				<h1>Modern Threads</h1>
			</div>
			<div
				className="hamburger"
				onClick={toggleNav}
				aria-label={isNavOpen ? "Close menu" : "Open menu"}
				aria-expanded={isNavOpen}
			>
				<span></span>
				<span></span>
				<span></span>
			</div>
			{!isLogin ? (
				<nav className={`admin-nav ${isNavOpen ? "open" : ""}`}>
					<ul>
						<li>
							<button className="logout-btn" onClick={handleLogout}>
								Logout
							</button>
						</li>
					</ul>
				</nav>
			) : null}
		</header>
	);
}

export default Header;

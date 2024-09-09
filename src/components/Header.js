import React, { useState } from "react";
import "../asserts/style/Header.css";
import { logout } from "../services/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Header({ isLogin }) {
	const [isNavOpen, setIsNavOpen] = useState(false); // State to manage the visibility of the navigation menu

	// Function to toggle the navigation menu
	const toggleNav = () => {
		setIsNavOpen(!isNavOpen);
	};

	const navigate = useNavigate(); // Hook to programmatically navigate

	// Function to handle user logout
	const handleLogout = async () => {
		try {
			await logout(); // Call the logout function from the API service
			navigate("/login"); // Redirect to the login page
			setTimeout(() => {
				window.location.reload(); // Reload the page to clear any remaining authentication state
			}, 800);
			toast.success("Logged out successfully"); // Show success message
		} catch (error) {
			toast.error("Logout failed"); // Show error message if logout fails
		}
	};

	return (
		<header className="admin-header">
			<div className="logo">
				<h1>Modern Threads</h1> {/* Display the logo */}
			</div>
			<div
				className="hamburger"
				onClick={toggleNav} // Toggle navigation menu on click
				aria-label={isNavOpen ? "Close menu" : "Open menu"} // Accessibility label for screen readers
				aria-expanded={isNavOpen} // Accessibility state for screen readers
			>
				<span></span>
				<span></span>
				<span></span>
			</div>
			{!isLogin ? ( // Conditionally render navigation menu based on login status
				<nav className={`admin-nav ${isNavOpen ? "open" : ""}`}>
					<ul>
						<li>
							<button className="logout-btn" onClick={handleLogout}>
								Logout {/* Logout button */}
							</button>
						</li>
					</ul>
				</nav>
			) : null}
		</header>
	);
}

export default Header;

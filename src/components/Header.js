import React, { useState } from "react";
import "../asserts/style/Header.css";

function Header({ isLogin }) {
	const [isNavOpen, setIsNavOpen] = useState(false);

	const toggleNav = () => {
		setIsNavOpen(!isNavOpen);
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
			{isLogin ? (
				<nav className={`admin-nav ${isNavOpen ? "open" : ""}`}>
					<ul>
						<li>Settings</li>
						<li>Logout</li>
					</ul>
				</nav>
			) : (
				""
			)}
		</header>
	);
}

export default Header;

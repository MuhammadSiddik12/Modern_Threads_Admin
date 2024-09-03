import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../asserts/style/Login.css";

const LoginPage = () => {
	const [email, setEmail] = useState(""); // State for storing email input
	const [password, setPassword] = useState(""); // State for storing password input
	const navigate = useNavigate(); // Hook for programmatic navigation

	const handleSubmit = (e) => {
		e.preventDefault(); // Prevent default form submission behavior

		// Simulate login process and set user data
		const userData = { email, token: "sample-token" };

		navigate("/"); // Redirect to home page after successful login
	};

	return (
		<div className="auth-page">
			<form className="auth-form" onSubmit={handleSubmit}>
				<h2>Login</h2>
				<div className="form-group">
					<label>Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)} // Update email state on change
						required // Ensure field is filled before submission
					/>
				</div>
				<div className="form-group">
					<label>Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)} // Update password state on change
						required // Ensure field is filled before submission
					/>
				</div>
				<button type="submit" className="auth-button">
					Login
				</button>

				{/* Link to sign up page if the user does not have an account */}
				<div className="auth-switch">
					<span>Don't have an account? </span>
					<Link to="/signup">Sign up here</Link>
				</div>
			</form>
		</div>
	);
};

export default LoginPage;

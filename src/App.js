import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import Users from "./components/Users/UserList";
import Products from "./components/Products/ProductList";
import Categories from "./components/Categories/CategoryList";
import Orders from "./components/Orders/OrderList";
import Payments from "./components/Payments/PaymentList";
import "./App.css";
import Header from "./components/Header";
import LoginPage from "./components/Profile/Login";
import EditCategory from "./components/Categories/EditCategory";
import AddCategory from "./components/Categories/AddCategory";
import CategoryDetail from "./components/Categories/CategoryDetail";
import UserDetails from "./components/Users/UserDetails";
import ProductDetails from "./components/Products/ProductDetails";
import AddProduct from "./components/Products/AddProduct";
import EditProduct from "./components/Products/ProductEdit";
import OrderDetails from "./components/Orders/OrderDetails";
import PaymentDetails from "./components/Payments/PaymentDetails";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";
import AdminProfile from "./components/Profile/Profile";
function App() {
	const isAuthPage = window.location.pathname === "/login";
	return (
		<Router>
			<div className="app">
				{" "}
				<Header isLogin={isAuthPage} />
				<div className={!isAuthPage ? "main-content" : ""}>
					{!isAuthPage ? (
						<PrivateRoute>
							<Sidebar />
						</PrivateRoute>
					) : (
						""
					)}
					<div className="content">
						<Routes>
							<Route path="/login" element={<LoginPage />} />
							<Route
								path="/"
								element={
									<PrivateRoute>
										<Dashboard />
									</PrivateRoute>
								}
							/>
							<Route
								path="/users"
								element={
									<PrivateRoute>
										<Users />
									</PrivateRoute>
								}
							/>
							<Route
								path="/users/:id"
								element={
									<PrivateRoute>
										<UserDetails />
									</PrivateRoute>
								}
							/>
							<Route
								path="/categories"
								element={
									<PrivateRoute>
										<Categories />
									</PrivateRoute>
								}
							/>
							<Route
								path="/category/:id"
								element={
									<PrivateRoute>
										<CategoryDetail />
									</PrivateRoute>
								}
							/>
							<Route
								path="/add-category"
								element={
									<PrivateRoute>
										<AddCategory />
									</PrivateRoute>
								}
							/>
							<Route
								path="/edit-category/:id"
								element={
									<PrivateRoute>
										<EditCategory />
									</PrivateRoute>
								}
							/>
							<Route
								path="/products"
								element={
									<PrivateRoute>
										<Products />
									</PrivateRoute>
								}
							/>
							<Route
								path="/products/:id"
								element={
									<PrivateRoute>
										<ProductDetails />
									</PrivateRoute>
								}
							/>
							<Route
								path="/products/add"
								element={
									<PrivateRoute>
										<AddProduct />
									</PrivateRoute>
								}
							/>
							<Route
								path="/products/edit/:id"
								element={
									<PrivateRoute>
										<EditProduct />
									</PrivateRoute>
								}
							/>
							<Route
								path="/orders"
								element={
									<PrivateRoute>
										<Orders />
									</PrivateRoute>
								}
							/>
							<Route
								path="/orders/:id"
								element={
									<PrivateRoute>
										<OrderDetails />
									</PrivateRoute>
								}
							/>
							<Route
								path="/payments"
								element={
									<PrivateRoute>
										<Payments />
									</PrivateRoute>
								}
							/>
							<Route
								path="/payments/:id"
								element={
									<PrivateRoute>
										<PaymentDetails />
									</PrivateRoute>
								}
							/>
							<Route
								path="/profile"
								element={
									<PrivateRoute>
										<AdminProfile />
									</PrivateRoute>
								}
							/>
						</Routes>
					</div>
				</div>
			</div>
			<ToastContainer />
		</Router>
	);
}

export default App;

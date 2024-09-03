import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users/UserList";
import Products from "./components/Products/ProductList";
import Categories from "./components/Categories/CategoryList";
import Orders from "./components/Orders/OrderList";
import Payments from "./components/Payments/PaymentList";
import "./App.css";
import Header from "./components/Header";
import LoginPage from "./components/Login";
import EditCategory from "./components/Categories/EditCategory";
import AddCategory from "./components/Categories/AddCategory";
import CategoryDetail from "./components/Categories/CategoryDetail";
import UserDetails from "./components/Users/UserDetails";
import ProductDetails from "./components/Products/ProductDetails";
import AddProduct from "./components/Products/AddProduct";
import EditProduct from "./components/Products/ProductEdit";
import OrderDetails from "./components/Orders/OrderDetails";
import PaymentDetails from "./components/Payments/PaymentDetails";

function App() {
	const isAuthPage = window.location.pathname === "/login";
	return (
		<Router>
			<div className="app">
				{!isAuthPage ? (
					<>
						<Header isLogin={true} />
						<div className="main-content">
							<Sidebar />
							<div className="content">
								<Routes>
									<Route path="/" element={<Dashboard />} />
									<Route path="/users" element={<Users />} />
									<Route path="/users/:id" element={<UserDetails />} />
									<Route path="/categories" element={<Categories />} />
									<Route path="/category/:id" element={<CategoryDetail />} />
									<Route path="/add-category" element={<AddCategory />} />
									<Route path="/edit-category/:id" element={<EditCategory />} />
									<Route path="/products" element={<Products />} />
									<Route path="/products/:id" element={<ProductDetails />} />
									<Route path="/products/add" element={<AddProduct />} />
									<Route path="/products/edit/:id" element={<EditProduct />} />
									<Route path="/orders" element={<Orders />} />
									<Route path="/orders/:id" element={<OrderDetails />} />
									<Route path="/payments" element={<Payments />} />
									<Route path="/payments/:id" element={<PaymentDetails />} />
								</Routes>
							</div>
						</div>
					</>
				) : (
					<>
						<Header isLogin={false} />
						<div className="content">
							<Routes>
								<Route path="/login" element={<LoginPage />} />
							</Routes>
						</div>
					</>
				)}
			</div>
		</Router>
	);
}

export default App;

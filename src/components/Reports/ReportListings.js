import React, { useState, useEffect } from "react";
import "../../asserts/style/Reports/reports.css";
import {
	getAllReports,
	generateReports,
	IMAGE_BASE_URL,
} from "../../services/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reports = () => {
	const [reports, setReports] = useState([]); // State to store the list of reports
	const [reportType, setReportType] = useState(""); // State to store selected report type
	const [loading, setLoading] = useState(false); // State to manage loading indicator

	// Fetch all reports from the API
	const fetchReports = async () => {
		setLoading(true); // Show loading indicator
		try {
			const response = await getAllReports();
			setReports(response.data); // Update state with fetched reports
		} catch (error) {
			toast.error("Error fetching reports"); // Show error message
			console.error("Error fetching reports", error); // Log error
		} finally {
			setLoading(false); // Hide loading indicator
		}
	};

	// Generate a report based on the selected type
	const generateReport = async () => {
		setLoading(true); // Show loading indicator
		try {
			await generateReports({ report_type: reportType });
			toast.success("Report generated successfully!"); // Show success message
			setReportType(""); // Clear selected report type
			fetchReports(); // Refresh the list of reports
		} catch (error) {
			toast.error("Error generating report"); // Show error message
			console.error("Error generating report", error); // Log error
		} finally {
			setLoading(false); // Hide loading indicator
		}
	};

	// Fetch reports when the component mounts
	useEffect(() => {
		fetchReports();
	}, []);

	return (
		<div className="report-container">
			<h1>Generate Report</h1>

			{/* Dropdown to select the type of report */}
			<select
				value={reportType}
				onChange={(e) => setReportType(e.target.value)}
			>
				<option value="" disabled>
					Select Report Type
				</option>
				<option value="users">User Report</option>
				<option value="products">Product Report</option>
				<option value="orders">Orders Report</option>
				<option value="categories">Categories Report</option>
			</select>
			<button onClick={generateReport}>Generate Report</button>

			<h1>All Reports</h1>

			{/* Display loading indicator or list of reports */}
			{loading ? (
				<div className="loader">
					<h3>Loading...</h3>
				</div>
			) : (
				<ul>
					{/* List all generated reports */}
					{reports.map((report) => (
						<li key={report.report_id}>
							{report.report_type} -{" "}
							{new Date(report.created_at).toLocaleString()}
							<a href={`${IMAGE_BASE_URL}${report.report_url}`} download>
								<button>Download</button>
							</a>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Reports;

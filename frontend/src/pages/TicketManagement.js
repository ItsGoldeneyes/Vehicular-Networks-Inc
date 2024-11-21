import React, { useState, useEffect } from "react";
import axios from "axios";
import * as dayjs from "dayjs";
import "../styles/TicketManagement.css";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";

// const initialTickets = [
//   { id: 1, subject: 'Issue with login', status: 'Open', assignedTo: 'John Doe', feedback: "" },
//   { id: 2, subject: 'Payment not processed', status: 'In Progress', assignedTo: 'Jane Smith', feedback: "" },
// ];

function TicketManagement() {
	const [tickets, setTickets] = useState([]);
	const [selectedTicket, setSelectedTicket] = useState(null);
	const [feedback, setFeedback] = useState("");
	const [admins, setAdmins] = useState([]);
	const [selectedAdmin, setSelectedAdmin] = useState("");
	const [selectedStatus, setSelectedStatus] = useState("");
	const [userFeedbacks, setUserFeedbacks] = useState([]);
	const [showSuccessful, setShowSuccessful] = useState(false);
	const [alertContent, setAlertContent] = useState("");

	const fetchAdmins = async () => {
		try {
			const res = await axios.get("http://localhost:5000/api/users");
			const admins = res.data.filter(
				(user) => user.role === "admin" || user.role === "superadmin"
			);
			console.log("admins", admins);
			setAdmins(admins);
		} catch (err) {
			console.log(err);
		}
	};

	const fetchTickets = async () => {
		try {
			const res = await axios.get("http://localhost:5000/api/tickets");
			console.log("tickets", res.data);
			setTickets(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	const fetchUserFeedback = async () => {
		try {
			const res = await axios.get("http://localhost:5000/api/userfeedback");
			console.log("user feedback", res.data);
			setUserFeedbacks(res.data);
		} 
		catch (err) {
			console.log(err);
		}
	};


	const formatDate = (date) => {
		if (!date) return "";
		// const date = new Date(date);
		// const d = date);
		// const year = d.getFullYear();
		// const month = String(d.getMonth() + 1).padStart(2, '0');
		// const day = String(d.getDate()).padStart(2, '0');
		// return `${year}-${month}-${day}`;
		return dayjs(date).format("YYYY-MM-DD");
	};

	const updateStatus = async (ticket) => {
		let currDate = new dayjs().add(1, "d").format("YYYY-MM-DD");
		console.log(currDate);
		let res = null;
		try {
			if (selectedStatus === "Open" || selectedStatus === "In Progress") {
				res = await axios.put(
					`http://localhost:5000/api/tickets/${ticket.Ticket_ID}`,
					{
						...ticket,
						Status: selectedStatus,
						Date_resolved: null,
					}
				);
			} else if (selectedStatus === "Closed") {
				res = await axios.put(
					`http://localhost:5000/api/tickets/${ticket.Ticket_ID}`,
					{
						...ticket,
						Status: selectedStatus,
						Date_resolved: currDate,
					}
				);
			}
			setAlertContent("Status updated successfully");
			setShowSuccessful(true);
			setTimeout(() => {
				setShowSuccessful(false);
			}, 2500);
			console.log(res.data);
			fetchTickets();
		} catch (err) {
			console.log(err);
		}
	};

	const updateFeedback = async (ticket, feedback) => {
		if (feedback === "") {
			setSelectedTicket(null);
		}
		try {
			const res = await axios.put(
				`http://localhost:5000/api/tickets/${ticket.Ticket_ID}`,
				{
					...ticket,
					feedback: feedback,
				}
			);
			setAlertContent("Feedback updated successfully");
			setShowSuccessful(true);
			setTimeout(() => {
				setShowSuccessful(false);
			}, 2500);
			console.log(res.data);
			fetchTickets();
		} catch (err) {
			console.error("Error updating feedback:", err);
		}
		setSelectedTicket(null);
	};

	const getAdminName = (adminID) => {
		const admin = admins.find((admin) => admin.User_ID === adminID);
		return admin ? `${admin.fName} ${admin.lName}` : "";
	};

	const assignAdmin = async (ticket, adminID) => {
		try {
			const res = await axios.put(
				`http://localhost:5000/api/tickets/${ticket.Ticket_ID}`,
				{
					Admin_ID: adminID,
					Status: ticket.Status,
					Date_resolved: ticket.Date_resolved,
				}
			);
			setAlertContent("Admin assigned successfully");
			setShowSuccessful(true);
			setTimeout(() => {
				setShowSuccessful(false);
			}, 2500);
			console.log(res.data);
			fetchTickets();
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchAdmins();
		fetchTickets();
		fetchUserFeedback();
	}, []);

	return (
		<div className="ticket-management-container">
			{showSuccessful && <Alert severity="success">{alertContent}</Alert>}
			<h2>Ticket & Feedback Management</h2>
			<h3>Tickets</h3>
			<table className="ticket-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Description</th>
						<th>Status</th>
						<th>From</th>
						<th>Assigned To</th>
						<th>Date Created</th>
						<th>Date Resolved</th>
						<th>Priority</th>
						<th>Feedback</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{tickets.map((ticket) => (
						<tr key={ticket.Ticket_ID}>
							<td>{ticket.Ticket_ID}</td>
							<td>{ticket.TicketDescription}</td>
							<td>{ticket.Status}</td>
							<td>{ticket.Submitter_ID}</td>
							<td>{getAdminName(ticket.Admin_ID)}</td>
							<td>{formatDate(ticket.Date_created)}</td>
							<td>{formatDate(ticket.Date_resolved)}</td>
							<td>{ticket.TicketPriority}</td>
							<td>{ticket.Feedback}</td>
							<td>
								<div className="ticket-actions-container">
									<div>
										<Button
											variant="contained"
											onClick={() =>
												setSelectedTicket(ticket)
											}
										>
											Respond
										</Button>
									</div>
									<div>
										<select
											onChange={(e) =>
												setSelectedAdmin(e.target.value)
											}
											value={selectedAdmin}
										>
											<option value="">
												Assign Admin
											</option>
											{admins.map((admin) => (
												<option
													key={admin.User_ID}
													value={admin.User_ID}
												>
													{admin.fName} {admin.lName}
												</option>
											))}
										</select>
										<Button
											variant="contained"
											onClick={() =>
												assignAdmin(
													ticket,
													selectedAdmin
												)
											}
										>
											Assign
										</Button>
									</div>
									<div>
										<select
											value={selectedStatus}
											onChange={(e) =>
												setSelectedStatus(
													e.target.value
												)
											}
										>
											<option value="Open">Open</option>
											<option value="In Progress">
												In Progress
											</option>
											<option value="Closed">
												Closed
											</option>
										</select>
										<Button
											variant="contained"
											onClick={() => updateStatus(ticket)}
										>
											Set Status
										</Button>
									</div>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<h3>Feedback</h3>
			<table className="feedback-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>User ID</th>
						<th>Rating</th>
						<th>Comments</th>
						<th>Date Submitted</th>
					</tr>
				</thead>
				<tbody>
					{userFeedbacks.map((feedback) => (
						<tr key={feedback.Submission_ID}>
							<td>{feedback.Submission_ID}</td>
							<td>{feedback.User_ID}</td>
							<td>{feedback.Rating}</td>
							<td>{feedback.Comments}</td>
							<td>{formatDate(feedback.Date_submitted)}</td>
						</tr>
					))}
				</tbody>
			</table>
			{selectedTicket && (
				<div className="modal">
					<div className="modal-content">
						<h2>Respond to Ticket</h2>
						<label>
							Feedback:
							<textarea
								value={feedback}
								onChange={(e) => setFeedback(e.target.value)}
							/>
						</label>
						<Button
							variant="contained"
							onClick={() =>
								updateFeedback(selectedTicket, feedback)
							}
						>
							Save
						</Button>
						<Button>Email</Button>
						<Button
							onClick={() => updateFeedback(selectedTicket, "")}
						>
							Cancel
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export default TicketManagement;

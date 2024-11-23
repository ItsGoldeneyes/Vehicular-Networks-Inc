import React, { useState, useEffect } from "react";
import axios from "axios";
import * as dayjs from "dayjs";
import "../styles/ContentManagement.css";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

function ContentManagement() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [admin, setAdmin] = useState([]);
	const [contentType, setContentType] = useState("");
	const [link, setLink] = useState("");
	const [contentUploads, setContentUploads] = useState([]);
	const [admins, setAdmins] = useState([]);
	const [showSuccessful, setShowSuccessful] = useState(false);
	const [alertContent, setAlertContent] = useState("");

	// fetch content upload history
	const fetchContentUploads = async () => {
		try {
			const res = await axios.get("https://fleetrewards-backend-group7.up.railway.app/api/content");
			setContentUploads(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	// fetch all admins
	const fetchAdmins = async () => {
		try {
			const res = await axios.get("https://fleetrewards-backend-group7.up.railway.app/api/users");
			const admins = res.data.filter(
				(user) => user.role === "admin" || user.role === "superadmin" // fetch all users with roles either admin or superadmin
			);
			console.log("admins", admins);
			setAdmins(admins);
		} catch (err) {
			console.log(err);
		}
	};

	// get admin name by ID
	const getAdminName = (adminID) => {
		const admin = admins.find((admin) => admin.User_ID === adminID);
		return admin ? `${admin.fName} ${admin.lName}` : "";
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

	// upload content
	const handleUpload = async () => {
		let currDate = dayjs().format("YYYY-MM-DD");
		try {
			const res = await axios.post("https://fleetrewards-backend-group7.up.railway.app/api/content", {
				AdminID: admin,
				Title: title,
				ContentDescription: description,
				ContentType: contentType,
				DateUploaded: currDate,
				ScheduledDate: date || null,
				link,
			});
		} catch (err) {
			console.log(err);
		}
		fetchContentUploads();
		setAlertContent("Content added successfully");
		setShowSuccessful(true);
		setTimeout(() => {
			setShowSuccessful(false);
		}, 2500);
		setTitle("");
		setDescription("");
		setDate("");
	};

	useEffect(() => {
		fetchAdmins();
		fetchContentUploads();
	}, []);

	return (
		<div>
			{showSuccessful && <Alert severity="success">{alertContent}</Alert>}
			<div className="content-management-container">
				<div>
					<h2>Content Management</h2>
					<div className="upload-form">
						<label>
							Title:
							<input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</label>
						<label>
							Description:
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</label>
						<label>
							Link to Website/Document:
							<textarea
								value={link}
								onChange={(e) => setLink(e.target.value)}
							/>
						</label>
						<label>
							Content Type:
							<select
								onChange={(e) => setContentType(e.target.value)}
								value={contentType}
							>
								<option value="" disabled>
									Set Content Type
								</option>
								<option value="Tutorial">Tutorial</option>
								<option value="Document">Document</option>
								<option value="Slideshow">Slideshow</option>
								<option value="Other">Other</option>
							</select>
						</label>
						<label>
							Schedule Date:
							<input
								type="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
							/>
						</label>
						<select
							onChange={(e) => setAdmin(e.target.value)}
							value={admin}
						>
							<option value="" disabled>
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
						<Button variant="contained" onClick={handleUpload}>
							Upload
						</Button>
					</div>
				</div>

				<div>
					<h2>Content Upload History</h2>
					<table className="user-info-table">
						<thead>
							<tr>
								<th>Content ID</th>
								<th>Uploader</th>
								<th>Title</th>
								<th>Description</th>
								<th>Type</th>
								<th>Date Uploaded</th>
								<th>Date Scheduled</th>
								<th>Link</th>
							</tr>
						</thead>
						<tbody>
							{contentUploads.map((content) => (
								<tr key={content.ContentID}>
									<td>{content.ContentID}</td>
									<td>{getAdminName(content.AdminID)}</td>
									<td>{content.Title}</td>
									<td>{content.ContentDescription}</td>
									<td>{content.ContentType}</td>
									<td>{formatDate(content.DateUploaded)}</td>
									<td>{formatDate(content.ScheduledDate)}</td>
									<td>{content.Link}</td>
								</tr>
							))}
						</tbody>
					</table>

					{/* <h3>Scheduled Content</h3>
      <ul className="content-list">
        {contentList.map((content, index) => (
          <li key={index}>
            <h4>{content.title}</h4>
            <p>{content.description}</p>
            <p>Scheduled for: {content.date}</p>
          </li>
        ))}
      </ul> */}
				</div>
			</div>
		</div>
	);
}

export default ContentManagement;
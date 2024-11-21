import React, { useState } from "react";
import "./EditUserModal.css";
import Button from "@mui/material/Button";

function EditUserModal({ user, onClose, onSave }) {
	const [fName, setFName] = useState(user.fName);
	const [lName, setLName] = useState(user.lName);
	const [email, setEmail] = useState(user.Email);
	const [role, setRole] = useState(user.role);
	const [accessLevel, setAccessLevel] = useState(user.accessLevel);

	const handleSave = () => {
		const updatedUser = { ...user, fName, lName, Email: email, role, accessLevel };
		console.log("Update user", updatedUser);
		onSave(updatedUser);
	};

	return (
		<div className="modal">
			<div className="modal-content">
				<h2>Edit User</h2>
				<label>
					First Name:
					<input
						type="text"
						value={fName}
						onChange={(e) => setFName(e.target.value)}
					/>
				</label>
				<label>
					Last Name:
					<input
						type="text"
						value={lName}
						onChange={(e) => setLName(e.target.value)}
					/>
				</label>
				<label>
					Email:
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label>
					Role:
					<select
						id="roles"
						name="roles"
						onChange={(e) => setRole(e.target.value)}
					>
						<option value="">Select role</option>
						<option value="enduser">End User</option>
						<option value="admin">Admin</option>
						<option value="superadmin">Super Admin</option>
					</select>
				</label>
				<label>
					Access Level:
					<input
						type="number"
						value={accessLevel}
						min={1}
						max={3}
						onChange={(e) => setAccessLevel(e.target.value)}
					/>
				</label>
				<Button variant="contained" onClick={handleSave}>Save</Button>
				<Button variant="contained" onClick={onClose}>Cancel</Button>
			</div>
		</div>
	);
}

export default EditUserModal;

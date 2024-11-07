import React, { useState } from "react";
import "./EditUserModal.css";

function EditUserModal({ user, onClose, onSave }) {
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [role, setRole] = useState(user.role);
	const [accessLevel, setAccessLevel] = useState(user.accessLevel);

	const handleSave = () => {
		const updatedUser = { ...user, name, role, accessLevel };
		onSave(updatedUser);
	};

	return (
		<div className="modal">
			<div className="modal-content">
				<h2>Edit User</h2>
				<label>
					Name:
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
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
						<option value="User">User</option>
						<option value="Admin">Admin</option>
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
				<button onClick={handleSave}>Save</button>
				<button onClick={onClose}>Cancel</button>
			</div>
		</div>
	);
}

export default EditUserModal;

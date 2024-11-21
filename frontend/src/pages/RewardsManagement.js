import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/RewardsManagement.css";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

// const initialRewards = [
// 	{ id: 1, name: "Free Coffee", points: 100, status: "Available" },
// 	{ id: 2, name: "Discount Voucher", points: 200, status: "Available" },
// ];

function RewardsManagement() {
	const [rewards, setRewards] = useState([]);
	const [selectedReward, setSelectedReward] = useState(null);
	const [points, setPoints] = useState("");
	const [status, setStatus] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [showSuccessful, setShowSuccessful] = useState(false);
	const [alertContent, setAlertContent] = useState("");

	const fetchRewards = async () => {
		try {
			const res = await axios.get("http://localhost:5000/api/rewards");
			console.log(res.data);
			setRewards(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	const editReward = (reward) => {
		setSelectedReward(reward);
		// setPoints(reward.Points_required);
		setStatus("");
		// setName(reward.rewardName);
		// setDescription(reward.RewardsDescription);
	};

	const saveRewardEdit = async () => {
		try {
			const res = await axios.put(
				`http://localhost:5000/api/rewards/${selectedReward.Reward_ID}`,
				{
					Points: points,
					Status: status,
					Name: name,
					Description: description,
				}
			);
		} catch (err) {
			console.log(err);
		}
		fetchRewards();
		setAlertContent("Reward updated successfully");
		setShowSuccessful(true);
		setTimeout(() => {
			setShowSuccessful(false);
		}, 2500);
		setSelectedReward(null);
		setPoints("");
		setStatus("");
		setName("");
		setDescription("");
	};

	const addReward = async () => {
		console.log(points, status, name, description);
		try {
			const res = await axios.post("http://localhost:5000/api/rewards", {
				Points: points,
				Status: status,
				Name: name,
				Description: description,
			});
		} catch (err) {
			console.log(err);
		}
		fetchRewards();
		setAlertContent("Reward added successfully");
		setShowSuccessful(true);
		setTimeout(() => {
			setShowSuccessful(false);
		}, 2500);
		setPoints("");
		setStatus("");
		setName("");
		setDescription("");
	};

	useEffect(() => {
		fetchRewards();
	}, []);

	return (
		<div>
			{showSuccessful && <Alert severity="success">{alertContent}</Alert>}
			<h2>Rewards Management</h2>
			<table className="rewards-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Description</th>
						<th>Points Required</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{rewards.map((reward) => (
						<tr key={reward.Reward_ID}>
							<td>{reward.Reward_ID}</td>
							<td>{reward.rewardName}</td>
							<td>{reward.RewardsDescription}</td>
							<td>{reward.Points_required}</td>
							<td>{reward.Status}</td>
							<td>
								<Button variant="contained" onClick={() => editReward(reward)}>
									Edit
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{selectedReward && (
				<div className="modal">
					<div className="modal-content">
						<h2>Edit Reward</h2>
						<label>
							Points:
							<input
								type="number"
								value={points}
								onChange={(e) => setPoints(e.target.value)}
							/>
						</label>
						<label>
							Status:
							<select
								id="availability"
								name="availability"
								value={status}
								onChange={(e) => setStatus(e.target.value)}
							>
								<option value="" disabled>
									Select Status
								</option>
								<option value="Active">Active</option>
								<option value="Inactive">Inactive</option>
							</select>
						</label>
						<Button variant="contained" onClick={saveRewardEdit}>Save</Button>
						<Button variant="contained" onClick={() => setSelectedReward(null)}>
							Cancel
						</Button>
					</div>
				</div>
			)}
			<div className="add-reward-form">
				<h2>Add New Reward</h2>
				<div className="reward-input-container">
					<label>
						Name:
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</label>
					<label>
						Points:
						<input
							type="number"
							value={points}
							onChange={(e) => setPoints(e.target.value)}
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
						Status:
						<select
							value={status}
							onChange={(e) => setStatus(e.target.value)}
						>
							<option value="" disabled>
								Select Status
							</option>
							<option value="Active">Active</option>
							<option value="Inactive">Inactive</option>
						</select>
					</label>
				</div>
				<Button variant="contained" onClick={addReward}>Add Reward</Button>
			</div>
		</div>
	);
}

export default RewardsManagement;

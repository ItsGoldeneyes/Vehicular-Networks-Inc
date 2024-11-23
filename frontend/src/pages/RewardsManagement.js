import React, { useState, useEffect } from "react";
import axios from "axios";
import * as dayjs from "dayjs";
import "../styles/RewardsManagement.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

// const initialRewards = [
// 	{ id: 1, name: "Free Coffee", points: 100, status: "Available" },
// 	{ id: 2, name: "Discount Voucher", points: 200, status: "Available" },
// ];

function RewardsManagement() {
	const [rewards, setRewards] = useState([]);
	const [rewardRedemptions, setRewardRedemptions] = useState([]);
	const [selectedReward, setSelectedReward] = useState(null);
	const [users, setUsers] = useState([]);
	const [points, setPoints] = useState("");
	const [status, setStatus] = useState("");
	const [approvalStatus, setApprovalStatus] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [showSuccessful, setShowSuccessful] = useState(false);
	const [showError, setShowError] = useState(false);
	const [alertContent, setAlertContent] = useState("");
	const [disableApprove, setDisableApprove] = useState(false);


	// fetch all users
	const fetchUsers = async () => {
		try {
			const res = await axios.get("https://fleetrewards-backend-group7.up.railway.app/api/users");
			console.log(res.data);
			setUsers(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	// fetch rewards
	const fetchRewards = async () => {
		try {
			const res = await axios.get("https://fleetrewards-backend-group7.up.railway.app/api/rewards");
			console.log(res.data);
			setRewards(res.data);
		} catch (err) {
			console.log(err);
		}
	};


	// fetch reward redemption requests
	const fetchRewardRedemptions = async () => {
		try {
			const res = await axios.get(
				"https://fleetrewards-backend-group7.up.railway.app/api/redeem-rewards"
			);
			console.log("reward redemptions", res.data);
			setRewardRedemptions(res.data);
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


	// save edit to rewards catalog and save to db
	const saveRewardEdit = async () => {
		try {
			const res = await axios.put(
				`https://fleetrewards-backend-group7.up.railway.app/api/rewards/${selectedReward.Reward_ID}`,
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


	// create new reward and save to db
	const addReward = async () => {
		console.log(points, status, name, description);
		try {
			const res = await axios.post("https://fleetrewards-backend-group7.up.railway.app/api/rewards", {
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


	// approve reward redemption request and update user points
	const handleApprove = async (id) => {
		try {
			let rewardRedemption = getRewardRedemptionById(id);

			if (rewardRedemption.ApprovalStatus === "Approved" || rewardRedemption.ApprovalStatus === "Rejected") {
				setAlertContent("Reward redemption has already been approved/rejected!");
				setShowError(true);
				setTimeout(() => {
					setShowError(false);
				}, 2500);
				return;
			}

			let user = getUserById(getRewardRedemptionById(id).User_ID);
			let userPoints = (getUserById(user.User_ID)).points;
			let pointsRequired = (getRewardById(getRewardRedemptionById(id).Reward_ID)).Points_required;

			if (userPoints < pointsRequired) {
				console.log("lol");
				setAlertContent("Not enough points to redeem this reward");
				setShowError(true);
				setTimeout(() => {
					setShowError(false);
				}, 2500);
			}
			else {
				await axios.put(`https://fleetrewards-backend-group7.up.railway.app/api/users/${user.User_ID}`, {
					...user,
					points: (userPoints - pointsRequired)
				});
				await axios.put(
					`https://fleetrewards-backend-group7.up.railway.app/api/redeem-rewards/${id}`,
					{
						Redemption_ID: id,
						ApprovalStatus: "Approved",
					}
				);
				setAlertContent("Reward redemption approved successfully");
				setShowSuccessful(true);
				setTimeout(() => {
					setShowSuccessful(false);
				}, 2500);
			}
			fetchRewardRedemptions();
			fetchUsers();
		} catch (err) {
			console.log(err);
		}
	};

	// reject reward redemption request
	const handleReject = async (id) => {
		try {
			let rewardRedemption = getRewardRedemptionById(id);

			if (rewardRedemption.ApprovalStatus === "Approved" || rewardRedemption.ApprovalStatus === "Rejected") {
				setAlertContent("Reward redemption has already been approved/rejected!");
				setShowError(true);
				setTimeout(() => {
					setShowError(false);
				}, 2500);
				return;
			}

			await axios.put(
				`https://fleetrewards-backend-group7.up.railway.app/api/redeem-rewards/${id}`,
				{
					Redemption_ID: id,
					ApprovalStatus: "Rejected",
				}
			);
		} catch (err) {
			console.log(err);
		}
		fetchRewardRedemptions();
	};

	// format date to yyyy-mm-dd
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

	// get user name by id
	const getNameById = (id) => {
		const user = users.find((u) => u.User_ID === id); // find user by id
		return user ? `${user.fName} ${user.lName}` : ""; // return concatenated first and last name
	};

	// get user by id
	const getUserById = (id) => {
		const user = users.find((u) => u.User_ID === id);
		return user ? user : null;
	};

	// get reward name by id
	const getRewardNameById = (id) => {
		const reward = rewards.find((r) => r.Reward_ID === id);
		return reward ? reward.rewardName : "";
	};

	// get reward by id
	const getRewardById = (id) => {
		const reward = rewards.find((r) => r.Reward_ID === id);
		return reward ? reward : null;
	};

	const getRewardRedemptionById = (id) => {
		const redemption = rewardRedemptions.find(
			(r) => r.Redemption_ID === id
		);
		return redemption ? redemption : null;
	};

	useEffect(() => {
		fetchUsers();
		fetchRewards();
		fetchRewardRedemptions();
	}, []);

	return (
		<div className="rewards-and-redemptions-container">
			{showSuccessful && <Alert severity="success">{alertContent}</Alert>}
			{showError && <Alert severity="error">{alertContent}</Alert>}
			<h2>Rewards Management</h2>
			<h3>Rewards Catalog</h3>
			<div className="rewards-container">
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
									<Button
										variant="contained"
										onClick={() => editReward(reward)}
									>
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
							<Button
								variant="contained"
								onClick={saveRewardEdit}
							>
								Save
							</Button>
							<Button
								variant="contained"
								onClick={() => setSelectedReward(null)}
							>
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
					<Button variant="contained" onClick={addReward}>
						Add Reward
					</Button>
				</div>
			</div>
			<div className="rewards-redemptions-container">
				<h3>User Reward Redemptions</h3>
				<table className="rewards-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>User</th>
							<th>Reward</th>
							<th>Redeem Date</th>
							<th>Approval Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{rewardRedemptions.map((r) => (
							<tr key={r.Redemption_ID}>
								<td>{r.Redemption_ID}</td>
								<td>{getNameById(r.User_ID)}</td>
								<td>{getRewardNameById(r.Reward_ID)}</td>
								<td>{formatDate(r.RedeemDate)}</td>
								<td>{r.ApprovalStatus}</td>
								<td>
									<Stack
										direction="row"
										spacing={2}
										sx={{
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										{" "}
										<Button
											color="success"
											variant="contained"
											onClick={() =>
												handleApprove(r.Redemption_ID)
											}
										>
											Approve
										</Button>
										<Button
											color="error"
											variant="contained"
											onClick={() =>
												handleReject(r.Redemption_ID)
											}
										>
											Reject
										</Button>
									</Stack>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default RewardsManagement;

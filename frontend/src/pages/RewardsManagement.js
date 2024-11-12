import React, { useState, useEffect } from "react";
import "../styles/RewardsManagement.css";

const RewardsManagement = () => {
	const [rewards, setRewards] = useState([]);
	const [selectedReward, setSelectedReward] = useState(null);
	const [points, setPoints] = useState("");

	// Fetch all rewards from the backend on component mount
	useEffect(() => {
		const fetchAllRewards = async () => {
			try {
				const response = await fetch("http://localhost:8080/api/rewards/all"); // Call the /all endpoint
				if (response.ok) {
					const data = await response.json();
					// Sort the rewards by rewardId in ascending order
					const sortedRewards = data.sort((a, b) => a.rewardId - b.rewardId);
					setRewards(sortedRewards); // Set the sorted rewards into state
				} else {
					console.error("Failed to fetch rewards");
				}
			} catch (error) {
				console.error("Error fetching rewards:", error);
			}
		};

		fetchAllRewards(); // Call the function to fetch rewards
	}, []); // Empty dependency array to run only once on mount

	// Handle editing a reward
	const editReward = (reward) => {
		setSelectedReward(reward);
		setPoints(reward.pointsRequired); // Set the current points to the input field
	};

	// Save updated reward to the backend
	const saveRewardEdit = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/rewards/${selectedReward.rewardId}/${points}`, // Update the reward points using the API
				{
					method: "POST", // Use POST to update points
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				// Update the reward in the UI after the update
				const updatedRewards = rewards.map((reward) =>
					reward.rewardId === selectedReward.rewardId
						? { ...reward, pointsRequired: points } // Update only pointsRequired
						: reward
				);
				setRewards(updatedRewards);
				setSelectedReward(null);
				setPoints("");
			} else {
				console.error("Failed to update reward");
			}
		} catch (error) {
			console.error("Error updating reward:", error);
		}
	};

	return (
		<div>
			<h2>Rewards Management</h2>
			<table className="rewards-table">
				<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Points</th>
					<th>Status</th>
					<th>Actions</th>
				</tr>
				</thead>
				<tbody>
				{rewards.map((reward) => (
					<tr key={reward.rewardId}>
						<td>{reward.rewardId}</td>
						<td>{reward.rewardName}</td>
						<td>{reward.pointsRequired}</td>
						<td>Active</td> {/* Add a static value for the status, as it wasn't in the response */}
						<td>
							<button onClick={() => editReward(reward)}>Edit</button>
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
						<button onClick={saveRewardEdit}>Save</button>
						<button onClick={() => setSelectedReward(null)}>Cancel</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default RewardsManagement;

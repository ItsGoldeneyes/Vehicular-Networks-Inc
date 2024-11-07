import React, { useState } from "react";
import "../styles/RewardsManagement.css";

const initialRewards = [
	{ id: 1, name: "Free Coffee", points: 100, status: "Available" },
	{ id: 2, name: "Discount Voucher", points: 200, status: "Available" },
];

function RewardsManagement() {
	const [rewards, setRewards] = useState(initialRewards);
	const [selectedReward, setSelectedReward] = useState(null);
	const [points, setPoints] = useState("");
	const [status, setStatus] = useState("");

	const editReward = (reward) => {
		setSelectedReward(reward);
		setPoints(reward.points);
		setStatus(reward.status);
	};

	const saveRewardEdit = () => {
		const updatedRewards = rewards.map((reward) =>
			reward.id === selectedReward.id
				? {
						id: reward.id,
						name: reward.name,
						point: points,
						status: status,
				  }
				: reward
		);
		setRewards(updatedRewards);
		setSelectedReward(null);
		setPoints("");
		setStatus("");
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
						<tr key={reward.id}>
							<td>{reward.id}</td>
							<td>{reward.name}</td>
							<td>{reward.points}</td>
							<td>{reward.status}</td>
							<td>
								<button onClick={() => editReward(reward)}>
									Edit
								</button>
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
								onChange={(e) => setStatus(e.target.value)}
							>
								<option value="">Select availability</option>
								<option value="Available">Available</option>
								<option value="Unavailable">Unavailable</option>
							</select>
						</label>
						<button onClick={saveRewardEdit}>Save</button>
						<button onClick={() => setSelectedReward(null)}>
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default RewardsManagement;

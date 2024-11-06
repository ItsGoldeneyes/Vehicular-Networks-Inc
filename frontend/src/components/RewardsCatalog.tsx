import React, { useState, useEffect } from 'react';

interface Reward {
    rewardId: number;
    rewardName: string;
    pointsRequired: number;
}

interface RewardsCatalogProps {
    rewards: Reward[];
    userId: number;
    updateUserPoints: (newPoints: number | ((prevPoints: number) => number)) => void;
}

const RewardsCatalog: React.FC<RewardsCatalogProps> = ({ rewards, userId, updateUserPoints }) => {
    const handleRedeem = async (reward: Reward) => {
        if (reward.pointsRequired > 0) {
            try {
                // Redeem the points on the backend by sending the userId and rewardId in the URL and query params
                const response = await fetch(`http://localhost:8080/api/loyalty/redeem/${reward.rewardId}/${userId}`, {
                    method: 'POST',  // Make sure method is POST
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    // If redemption is successful, update the points
                    updateUserPoints((prevPoints) => prevPoints - reward.pointsRequired);
                    alert(`Successfully redeemed: ${reward.rewardName}`);
                } else {
                    alert('Failed to redeem points. Please try again.');
                }
            } catch (err) {
                console.error('Error redeeming reward:', err);
                alert('Error redeeming reward.');
            }
        } else {
            alert('Insufficient points to redeem this reward');
        }
    };


    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-6">Rewards Catalog</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward) => (
                    <li key={reward.rewardId} className="bg-white border border-gray-300 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
                        <h3 className="text-xl font-semibold mb-2">{reward.rewardName}</h3>
                        <p className="text-gray-600 mb-4">{reward.pointsRequired} points</p>
                        <button
                            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                            onClick={() => handleRedeem(reward)}
                        >
                            Redeem
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RewardsCatalog;

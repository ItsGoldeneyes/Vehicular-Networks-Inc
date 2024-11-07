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
    refreshActivities: () => void; // New prop to refresh activities
}

const RewardsCatalog: React.FC<RewardsCatalogProps> = ({ rewards, userId, updateUserPoints, refreshActivities }) => {
    const handleRedeem = async (reward: Reward) => {
        if (reward.pointsRequired > 0) {
            try {
                // Redeem the points on the backend
                const response = await fetch(`http://localhost:8080/api/loyalty/redeem/${reward.rewardId}/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    // Update user points
                    updateUserPoints((prevPoints) => prevPoints - reward.pointsRequired);

                    // Log the redemption activity
                    const activityResponse = await fetch(`http://localhost:8080/api/activities/${userId}/${reward.rewardId}?type=REDEEMED`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (activityResponse.ok) {
                        alert(`Successfully redeemed: ${reward.rewardName} and logged activity.`);
                        refreshActivities(); // Refresh activities after logging
                    } else {
                        alert('Successfully redeemed, but failed to log activity.');
                    }
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

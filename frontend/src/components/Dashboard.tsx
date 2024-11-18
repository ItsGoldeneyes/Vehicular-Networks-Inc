import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PointsBalance from './PointsBalance';
import RecentActivities from './RecentActivities';
import RewardsCatalog from './RewardsCatalog';

const Dashboard: React.FC = () => {
    const userId = 8;  // Replace with a dynamic value if needed
    const [points, setPoints] = useState<number>(0);
    const [activities, setActivities] = useState<any[]>([]);
    const [rewards, setRewards] = useState<any[]>([]); // Rewards state
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch activities
    const fetchActivities = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/activities/${userId}`);
            setActivities(response.data);
        } catch (error: any) {
            setError('Error fetching activities.');
            console.error('Error fetching activities:', error);
        }
    };

    // Fetch points and rewards from the API
    useEffect(() => {
        const fetchPoints = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/${userId}/points`);
                setPoints(response.data.points);
            } catch (error: any) {
                setError('Error fetching points.');
                console.error('Error fetching points:', error);
            }
        };

        const fetchRewards = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/rewards/all');
                setRewards(response.data);  // Assuming response.data is an array of rewards
            } catch (error: any) {
                setError('Error fetching rewards.');
                console.error('Error fetching rewards:', error);
            }
        };

        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchPoints(), fetchActivities(), fetchRewards()]);
            setLoading(false);
        };

        fetchData();
    }, [userId]);

    // Function to update the user's points after redeeming a reward
    const updateUserPoints = (newPoints: number | ((prevPoints: number) => number)) => {
        if (typeof newPoints === 'function') {
            setPoints((prevPoints) => newPoints(prevPoints));
        } else {
            setPoints(newPoints);
        }
    };

    // Function to refresh activities after a reward redemption
    const refreshActivities = () => {
        fetchActivities();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="dashboard-container">
            <h1 className="header">Loyalty Points Dashboard</h1>
            <PointsBalance points={points} />
            <RecentActivities activities={activities} />
            <RewardsCatalog
                rewards={rewards}  // Pass the rewards data to RewardsCatalog
                userId={userId}    // Pass userId to RewardsCatalog
                updateUserPoints={updateUserPoints}  // Pass the updateUserPoints function to RewardsCatalog
                refreshActivities={refreshActivities}  // Pass the refreshActivities function to RewardsCatalog
            />
        </div>
    );
};

export default Dashboard;

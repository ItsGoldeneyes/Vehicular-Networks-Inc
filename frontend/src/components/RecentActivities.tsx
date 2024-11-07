import React from 'react';

// Define the structure of a single activity
interface Activity {
    timestamp: string;  // Renamed from 'date' to 'timestamp' to match backend data
    pointsChange: number; // Renamed from 'points' to 'pointsChange' to align with backend model
    description: string;
}

// Define the props interface for the component
interface RecentActivitiesProps {
    activities: Activity[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
    // Handle empty list case
    if (activities.length === 0) {
        return <div className="card"><h2 className="header">No Recent Activities</h2></div>;
    }

    return (
        <div className="card">
            <h2 className="header">Recent Activities</h2>
            <ul>
                {activities.map((activity, index) => (
                    <li key={index} className="reward-item">
                        <div>{new Date(activity.timestamp).toLocaleString()}: {activity.description}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentActivities;

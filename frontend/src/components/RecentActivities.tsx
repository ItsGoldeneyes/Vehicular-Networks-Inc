import React from 'react';

interface Activity {
    date: string;
    points: number;
    description: string;
}

interface RecentActivitiesProps {
    activities: Activity[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
    return (
        <div className="card">
            <h2 className="header">Recent Activities</h2>
            <ul>
                {activities.map((activity, index) => (
                    <li key={index} className="reward-item">
                        <div>{activity.date}: {activity.description} (+{activity.points} pts)</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentActivities;

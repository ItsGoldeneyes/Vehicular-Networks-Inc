import React from 'react';

interface PointsBalanceProps {
    points: number;
}

const PointsBalance: React.FC<PointsBalanceProps> = ({ points }) => {
    return (
        <div className="card">
            <h2 className="header">Your Points Balance</h2>
            <div className="point-balance">{points}</div>
        </div>
    );
};

export default PointsBalance;

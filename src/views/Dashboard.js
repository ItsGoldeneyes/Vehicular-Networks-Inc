import React from 'react';
import Navbar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import DashboardOverview from '../components/DashboardOverview';
import PointsTracker from '../components/PointsTracker';
import RewardsCatalog from '../components/RewardsCatalog';
import RecentActivity from '../components/RecentActivity';
import SupportTickets from '../components/SupportTickets';
import ProfileSummary from '../components/ProfileSummary';
import EducationalResources from '../components/EducationalResources';
import './styles.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <DashboardOverview />
          <div className="dashboard-widgets">
            <PointsTracker />
            <RewardsCatalog />
          </div>
          <div className="dashboard-main">
            <RecentActivity />
            <SupportTickets />
          </div>
          <div className="dashboard-footer">
            <ProfileSummary />
            <EducationalResources />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

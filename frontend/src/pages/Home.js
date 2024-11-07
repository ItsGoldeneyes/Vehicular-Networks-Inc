import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserManagement from './UserManagement';
import TicketManagement from './TicketManagement';
import RewardsManagement from './RewardsManagement';
import ContentManagement from './ContentManagement';
import '../styles/Home.css';

function Home() {
  return (
    <Router>
      <div className="dashboard">
        <nav className="sidebar">
        {/* <h2 className="admin-name">Hi (insert name)!</h2> */}
        <h2 className="admin-name">Hi Wahaj!</h2>
          <ul>
            <li><Link to="/user-management" className="button">User Management</Link></li>
            <li><Link to="/ticket-management" className="button">Ticket & Feedback Management</Link></li>
            <li><Link to="/rewards-management" className="button">Rewards Management</Link></li>
            <li><Link to="/content-management" className="button">Content Management</Link></li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/ticket-management" element={<TicketManagement />} />
            <Route path="/rewards-management" element={<RewardsManagement />} />
            <Route path="/content-management" element={<ContentManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Home;
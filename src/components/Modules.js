import React from 'react';

const Modules = () => (
  <section className="modules">
    <h2 className='programHeading'>Key Program Modules</h2>
    <div className="module-list">
      <div className="module">
        <h3>User Access Management</h3>
        <p>Manage registrations, secure login, and role-based access for fleet managers, drivers, and admins.</p>
      </div>
      <div className="module">
        <h3>User Profile & Account Management</h3>
        <p>Track activities, manage contact details, and view purchase history and rewards.</p>
      </div>
      <div className="module">
        <h3>Technical Support & Ticketing</h3>
        <p>Submit support requests, access live chat, and track ticket status in real-time.</p>
      </div>
      <div className="module">
        <h3>Loyalty Points & Rewards</h3>
        <p>Earn and redeem points for fleet purchases, service engagements, and event participation.</p>
      </div>
      <div className="module">
        <h3>Educational Resources</h3>
        <p>Access training resources, webinars, and events designed to improve fleet management skills.</p>
      </div>
    </div>
  </section>
);

export default Modules;

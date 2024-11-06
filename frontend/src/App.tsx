import React from 'react';
import Dashboard from './components/Dashboard'; // Import the Dashboard component

const App: React.FC = () => {
    return (
        <div className="container">
            <Dashboard />  {/* No need to pass props to Dashboard */}
        </div>
    );
};

export default App;

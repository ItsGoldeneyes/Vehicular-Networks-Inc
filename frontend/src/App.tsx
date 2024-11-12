import React from 'react';
import logo from './logo.svg'; // Include if the logo is used
import './App.css'; // Keep if there are relevant styles
import Dashboard from './components/Dashboard'; // Import the Dashboard component
import Home from './pages/Home'; // Import the Home component

const App: React.FC = () => {
    return (
        <div className="App">
         
            <Home />

        </div>
    );
};

export default App;

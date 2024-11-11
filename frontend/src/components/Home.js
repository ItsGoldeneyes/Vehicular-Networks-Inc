import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './Home.css'; // Import the CSS file

export default function Home() {
    const { theme } = useOutletContext(); // Get theme from context

    return (
        <div className={`home ${theme}`}>
            <h2>Welcome to the Home page</h2>
        </div>
    );
}

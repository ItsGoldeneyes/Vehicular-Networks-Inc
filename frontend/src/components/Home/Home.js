import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import './Home.css'; // Import the CSS file
import { useTheme } from '../../context/ThemeContext';

export default function Home() {
    const { theme } = useTheme();

    useEffect(() => {
        document.title = "Home - FleetRewards";
    }, []);

    return (
        <div className={`home ${theme}`}>
            <h2>Welcome to the Home page</h2>
        </div>
    );
}

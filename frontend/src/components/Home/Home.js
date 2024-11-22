import React, { useEffect } from 'react';
import './Home.css'; // Import the CSS file
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

export default function Home() {
    const { theme } = useTheme();
    const { user } = useUser();

    useEffect(() => {
        document.title = "Home - FleetRewards";
    }, []);

    return (
        <div className={`home ${theme}`}>
            <h2>Welcome to the Home page</h2>
            { user && <p>You are logged in!</p> }
            { !user && <p>You are not logged in. Other navigation buttons are available once you (register and) login.</p>}
        </div>
    );
}

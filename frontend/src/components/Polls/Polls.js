import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "./Polls.css"; // Import the CSS file

export default function Polls() {
  const { theme } = useOutletContext(); // Get theme from context

  useEffect(() => {
      document.title = "Polls - FleetRewards";
  }, []);

  return (
    <div className={`polls ${theme}`}>
      <h2>Welcome to Polls page</h2>
    </div>
  );
}

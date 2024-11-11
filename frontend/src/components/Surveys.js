import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "./Surveys.css"; // Import the CSS file

export default function Surveys() {
  const { theme } = useOutletContext(); // Get theme from context

  useEffect(() => {
      document.title = "Surveys - FleetRewards";
  }, []);

  return (
    <div className={`surveys ${theme}`}>
      <h2>Welcome to the Survey page</h2>
    </div>
  );
}

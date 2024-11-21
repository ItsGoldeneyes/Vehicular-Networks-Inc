import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "./Surveys.css"; // Import the CSS file
import { useTheme } from "../../context/ThemeContext";

export default function Surveys() {
  const { theme } = useTheme();

  useEffect(() => {
      document.title = "Surveys - FleetRewards";
  }, []);

  return (
    <div className={`surveys ${theme}`}>
      <h2>Welcome to the Survey page</h2>
    </div>
  );
}

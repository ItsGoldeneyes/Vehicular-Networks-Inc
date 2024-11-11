import React from "react";
import { useOutletContext } from "react-router-dom";
import "./FeedbackForm.css"; 

export default function FeedbackForm() {
  const { theme } = useOutletContext(); // Get theme from context

  return (
    <div className={`feedback-form ${theme}`}>
      <h2>Welcome to the FeedbackForm page</h2>
      {/* Add your form content here */}
    </div>
  );
}

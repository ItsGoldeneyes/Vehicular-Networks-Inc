import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import "./FeedbackForm.css";

export default function FeedbackForm() {
  const { theme } = useOutletContext(); // Get theme from context
  const [feedback, setFeedback] = useState(""); // State for feedback

  const handleSubmit = async () => {
    try {
      console.log(feedback);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={`feedback-form ${theme}`}>
      <h2>Is there anything sort of feedback you can give us?</h2>

      <TextField
        label="Give us your thought!"
        multiline
        rows={20}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        sx={{
          width: "100%",
          marginTop: "20px",
          backgroundColor: theme === "dark" ? "darkgray" : "white",
        }}
        slotProps={{
          input: {
            style: {
              color: theme === "dark" ? "white" : "black",
            },
          },
        }}
      />

      <Button
        id="submit-button"
        variant="contained"
        size="large"
        sx={{
          marginTop: "20px",
          backgroundColor: "#007bff",
        }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
}

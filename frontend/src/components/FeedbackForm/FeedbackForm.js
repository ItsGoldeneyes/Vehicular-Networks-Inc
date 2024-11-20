import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import "./FeedbackForm.css";
import { useFormFeedback } from "../../context/FormFeedbackContext";
import { useUser } from "../../context/UserContext";

export default function FeedbackForm() {
  const { theme } = useOutletContext(); // Get theme from context
  const [feedback, setFeedback] = useState(""); // State for feedback
  const { getFeedbackForm, submitFeedbackForm } = useFormFeedback();
  const [ hasSubmitted, setHasSubmitted ] = useState(false);
  const [ user ] = useUser();

  const handleSubmit = async () => {
    try {
      const success = await submitFeedbackForm({
        "user_id": user,
        "feedback": feedback
      });
      if (success) {
        setHasSubmitted(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={`feedback-form ${theme}`}>
      {
        hasSubmitted ? <>
          <h2>Thanks for your feedback!</h2>
          <p style={{marginTop: '20px'}}>We value your feedback and will strive to improve Vehicular Networks Inc., and our FleetRewards rewards program.</p>
          <Button 
            variant="contained"
            size="large"
            sx={{
              marginTop: "20px",
              backgroundColor: "#007bff",
            }}
            onClick={() => setHasSubmitted(false)}>
            Submit Another
          </Button>
        </> : <>
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
              inputLabel: {
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
        </>
      }
      
    </div>
  );
}

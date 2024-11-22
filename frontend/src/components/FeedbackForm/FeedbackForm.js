import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./FeedbackForm.css";
import { useUser } from "../../context/UserContext";
import { useFormFeedback } from "../../context/FormFeedbackContext";
import { useTheme } from "../../context/ThemeContext";

export default function FeedbackForm() {
  const { theme } = useTheme();
  const [ feedback, setFeedback ] = useState(""); // State for feedback
  const { getFeedbackForm, submitFeedbackForm } = useFormFeedback();
  const [ hasSubmitted, setHasSubmitted ] = useState(false);
  const { user } = useUser();

  const handleSubmit = async () => {
    try {
      const res = await submitFeedbackForm({
        requested_by: user.user_id,
        form: {
          form_id: "20c1200f-cc03-4b80-9349-f19f6e826d03",
          responses: [
            {
              question_num: 1,
              type: "freeform",
              answer: feedback
            }
          ]
        }
      });
      if (res.status === 200) {
        setHasSubmitted(true);
        setFeedback("");
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

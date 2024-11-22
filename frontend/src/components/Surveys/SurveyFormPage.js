import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Typography,
  LinearProgress,
} from "@mui/material";

const NODE_ENV = process.env.NODE_ENV || 'development';
const BACKEND_URL = NODE_ENV === 'development' ? 'http://127.0.0.1:5000' : 'https://backend-group5.up.railway.app/';

export default function SurveyFormPage() {
  const { id: formId } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({}); 
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.user_id) {
          setError("User is not logged in.");
          return;
        }

        const response = await fetch(`${BACKEND_URL}/get-form`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requested_by: user.user_id,
            form_id: formId,
          }),
        });

        const data = await response.json();
        if (data.status === 200) {
          setForm(data.form);
        } else {
          setError(data.text || "Failed to fetch form.");
        }
      } catch (err) {
        setError("An error occurred while fetching the form.");
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [formId]);

  const LinearProgressWithLabel = (props) => {
    return (
      <Box display="flex" alignItems="center" sx={{ width: "100%", mb: 2 }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  };

  const handleCheckboxChange = (questionIndex, option) => {
    setSelectedOptions((prevState) => {
      const updatedSelections = { ...prevState, [questionIndex]: option }; // Single value for multiple_choice
      handleProgressUpdate(questionIndex, option !== null);
      return updatedSelections;
    });
  };

  const handleProgressUpdate = (questionIndex, answered) => {
    const totalQuestions = form.questions.length;

    const completedQuestions = form.questions.reduce((count, question, idx) => {
      if (idx === questionIndex) {
        return count + (answered ? 1 : 0);
      }

      const isAnswered = (() => {
        if (question.type === "freeform") {
          const textInput = document.querySelector(
            `textarea[name="question-${idx}"]`
          );
          return textInput && textInput.value.trim() !== "";
        }

        if (question.type === "rate") {
          return document.querySelector(`input[name="question-${idx}"]:checked`);
        }

        if (question.type === "multiple_choice") {
          return selectedOptions[idx];
        }

        return false;
      })();

      return count + (isAnswered ? 1 : 0);
    }, 0);

    setProgress((completedQuestions / totalQuestions) * 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (progress < 100) {
      alert("Please complete all questions before submitting the form.");
      return;
    }

    const responses = form.questions.map((question, index) => {
      if (question.type === "freeform") {
        const textInput = document.querySelector(`textarea[name="question-${index}"]`);
        return {
          question_num: question.question_num,
          type: question.type,
          answer: textInput ? textInput.value : "",
        };
      }

      if (question.type === "rate") {
        const selectedRate = document.querySelector(
          `input[name="question-${index}"]:checked`
        );
        return {
          question_num: question.question_num,
          type: question.type,
          answer: selectedRate ? parseInt(selectedRate.value, 10) : null,
        };
      }

      if (question.type === "multiple_choice") {
        return {
          question_num: question.question_num,
          type: question.type,
          answer: selectedOptions[index] || null,
        };
      }

      return null;
    });

    const payload = {
      requested_by: JSON.parse(localStorage.getItem("user")).user_id,
      form: {
        form_id: formId,
        responses: responses,
      },
    };

    console.log("Payload Sent to Backend:", payload);

    try {
      const response = await fetch(`http://127.0.0.1:5000/submit-form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.status === 200) {
        alert("Form submitted successfully!");
        navigate("/surveys");
      } else {
        alert("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  if (loading) return <div>Loading form...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box
      className="survey-form-container"
      sx={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
        {form.name}
      </Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: "20px", color: "#555" }}>
        Points: {form.points}
      </Typography>
      <Typography variant="subtitle2" sx={({ marginBottom: "20px" })}>
        Fields marked with <span style={{ color: "#c00" }}>*</span> are required.
      </Typography>
      <LinearProgressWithLabel value={progress} />
      <form onSubmit={handleSubmit}>
        {form.questions.map((question, index) => (
          <Box key={index} sx={{ marginBottom: "20px" }}>
            <Typography variant="subtitle1" sx={{ marginBottom: "10px" }}>
              {question.question_num}. {question.description}<span style={{ color: "#c00" }}>*</span>
            </Typography>
            {question.type === "freeform" && (
              <TextField
                fullWidth
                multiline
                variant="outlined"
                name={`question-${index}`}
                onChange={(e) =>
                  handleProgressUpdate(index, e.target.value.trim() !== "")
                }
              />
            )}
            {question.type === "rate" && (
              <RadioGroup
                name={`question-${index}`}
                onChange={() => handleProgressUpdate(index, true)}
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <FormControlLabel
                    key={rating}
                    value={rating}
                    control={<Radio />}
                    label={rating}
                  />
                ))}
              </RadioGroup>
            )}
            {question.type === "multiple_choice" && (
              <RadioGroup
                name={`question-${index}`}
                onChange={(e) => handleCheckboxChange(index, e.target.value)}
              >
                {question.options.map((option, i) => (
                  <FormControlLabel
                    key={i}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            )}
          </Box>
        ))}
        <Button
          type="submit"
          variant="contained"
          disabled={progress < 100}
          sx={{
            backgroundColor: progress === 100 ? "#007bff" : "#ccc",
            color: "#ffffff",
            textTransform: "none",
            fontSize: "14px",
            padding: "8px 16px",
            ":hover": {
              backgroundColor: progress === 100 ? "#0056b3" : "#ccc",
            },
          }}
        >
          Continue
        </Button>
      </form>
    </Box>
  );
}

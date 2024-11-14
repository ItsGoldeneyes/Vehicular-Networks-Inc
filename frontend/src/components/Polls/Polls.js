import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Typography, TextField, Button, Rating } from "@mui/material";

export default function Polls() {
  const { theme } = useOutletContext(); // Get theme from context
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [pollData, setPollData] = useState({});

  //mock poll data (needs to connect to db)
  const fetchPollData = async () => {
    const data = {
      poll_name: "How are we Doing?",
      poll_text:
        "Let us know how satisfied you are with recent exclusive offers.",
      poll_label_l: "Bad", // dont think we need this
      poll_label_r: "Great", // dont think we need this
      poll_min: 1,
      poll_max: 5,
    };
    setPollData(data);
  };

  useEffect(() => {
    fetchPollData();
  }, []);

  const handleSubmit = () => {
    console.log("Submitted Rating:", rating);
    console.log("Submitted Comment:", comment);
    // api call here to post to poll res
  };
  //theme declaration also not needed?
  return (
    <div className={`polls ${theme}`}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: theme === "dark" ? "white" : "black",
          }}
        >
          {pollData.poll_name}
        </Typography>
        <Box
          sx={{
            maxWidth: 400,
            padding: 3,
            border: "1px solid #ccc",
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: theme === "dark" ? "darkgray" : "white",
          }}
          slotProps={{
            input: {
              style: {
                color: theme === "dark" ? "white" : "black",
              },
            },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              marginBottom: 2,
              color: theme === "dark" ? "white" : "black",
            }}
          >
            {pollData.poll_text}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              marginBottom: 2,
              color: theme === "dark" ? "white" : "black",
            }}
          >
            You will receive XXX points on submission.
          </Typography>

          <Box display="flex" alignItems="center" justifyContent="center">
            {/* <Typography variant="body1">{pollData.poll_label_l}</Typography> */}
            <Rating
              name="poll-rating"
              value={rating}
              onChange={(e, newValue) => {
                setRating(newValue);
              }}
              size="large"
              max={pollData.poll_max}
            />
            {/* <Typography variant="body1">{pollData.poll_label_r}</Typography> */}
          </Box>

          <TextField
            label="Any additional comments?" //picked up from wireframe. not stored in db, not needed
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            sx={{ marginTop: 2 }}
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
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
}

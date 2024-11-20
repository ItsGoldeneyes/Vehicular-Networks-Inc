import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserAllTickets } from "../store/home.store";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";

function SubmittedTickets() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const response = useSelector((state) => state.HomeStore.userAllTickets);

  useEffect(() => {
    dispatch(getUserAllTickets({ userID: "asas.b@example.com" }));
  }, [dispatch]);

  const handleCardClick = (ticket) => {
    // Navigate to the detail page and pass the ticket data
    navigate("/user/SubmittedTickets/ticket-detail", { state: ticket });
  };

  return (
    <div>
      {response && response["result"]?.length > 0 ? (
        response["result"].map((ticket, index) => (
          <Card
            key={index}
            variant="outlined"
            style={{ marginBottom: "10px", padding: "10px" }}
            onClick={() => handleCardClick(ticket)}
          >
            <p>
              <strong>Ticket ID:</strong> {ticket.ticket_id}
            </p>
            <p>
              <strong>Message:</strong> {ticket.message}
            </p>
            <p>
              <strong>Created At:</strong> {ticket.created_at}
            </p>
          </Card>
        ))
      ) : (
        <p>Loading tickets...</p> // Display a loading message if data isn't available
      )}
    </div>
  );
}

export default SubmittedTickets;

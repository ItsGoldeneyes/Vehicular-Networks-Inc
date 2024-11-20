import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import { getAgentAllTickets } from "../store/home.store";
import { useNavigate } from "react-router-dom";

function AgentHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const response = useSelector((state) => state.HomeStore.agentAllTickets);

  useEffect(() => {
    dispatch(getAgentAllTickets({ agentID: "admin3@example.com" }));
  }, [dispatch]);

  const handleCardClick = (ticket) => {
    // Navigate to the detail page and pass the ticket data
    navigate("/agent/ticket-detail", { state: ticket });
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

export default AgentHome;

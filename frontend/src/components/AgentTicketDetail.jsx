import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("wss://ticket-system-backend-hsoh.onrender.com");

export default function AgentTicketDetail() {
  const location = useLocation();
  const { agent_id, ticket_id, user_id } = location.state;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () =>
      fetch(
        "https://ticket-system-backend-hsoh.onrender.com/getTicketMessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ticketID: ticket_id }), //send our user data as POST
        }
      )
        .then((res) => res.json()) //get scraped data as GET
        .then((data) => {
          setMessages(data["result"]);
        });
    fetchMessages();
  }, []);

  const sendMessage = () => {
    if (!message) {
      return;
    }
    const messageData = {
      ticketID: ticket_id,
      userID: user_id,
      agentID: agent_id,
      creator: "agent",
      message: message,
    };
    socket.emit("send_message", messageData);
    setMessage("");
  };

  return (
    <div>
      <h1>Agent</h1>
      <div>
        {messages?.map((msg, index) => (
          <div key={index}>
            <p>
              <strong>{msg.creator === "agent" ? "You" : "Them"}:</strong>{" "}
              {msg.message}
            </p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

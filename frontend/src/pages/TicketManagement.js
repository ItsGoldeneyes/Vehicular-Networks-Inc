import React, { useState } from 'react';
import '../styles/TicketManagement.css';

const initialTickets = [
  { id: 1, subject: 'Issue with login', status: 'Open', assignedTo: 'John Doe', feedback: "" },
  { id: 2, subject: 'Payment not processed', status: 'In Progress', assignedTo: 'Jane Smith', feedback: "" },
];

function TicketManagement() {
  const [tickets, setTickets] = useState(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleAssign = (ticket, assignee) => {
    const updatedTickets = tickets.map(t => t.id === ticket.id ? { ...t, assignedTo: assignee } : t);
    setTickets(updatedTickets);
  };

  const handleRespond = (ticket, feedback) => {
    const updatedTickets = tickets.map(t => t.id === ticket.id ? { ...t, feedback } : t);
    setTickets(updatedTickets);
    setSelectedTicket(null);
    setFeedback("");
  };

  return (
    <div>
      <h2>Ticket & Feedback Management</h2>
      <table className="ticket-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Feedback</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.status}</td>
              <td>{ticket.assignedTo}</td>
              <td>{ticket.feedback}</td>
              <td>
                <button onClick={() => setSelectedTicket(ticket)}>Respond</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTicket && (
        <div className="modal">
          <div className="modal-content">
            <h2>Respond to Ticket</h2>
            <label>
              Feedback:
              <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
            </label>
            <button onClick={() => handleRespond(selectedTicket, feedback)}>Submit</button>
            <button onClick={() => setSelectedTicket(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketManagement;
import "./App.css";
import CreateTicket from "./components/CreateTicket";
import Customer from "./components/Customer";
import NavBar from "./components/NavBar";
import AgentHome from "./components/AgentHome";
import UserTicketDetail from "./components/UserTicketDetail";
import AgentTicketDetail from "./components/AgentTicketDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubmittedTickets from "./components/SubmittedTickets";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/user" element={<Customer />} />
          <Route path="/user/CreateTicket" element={<CreateTicket />} />
          <Route path="/user/SubmittedTickets" element={<SubmittedTickets />} />
          <Route
            path="/user/SubmittedTickets/ticket-detail"
            element={<UserTicketDetail />}
          />
          <Route exact path="/agent" element={<AgentHome />} />
          <Route path="/agent/ticket-detail" element={<AgentTicketDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

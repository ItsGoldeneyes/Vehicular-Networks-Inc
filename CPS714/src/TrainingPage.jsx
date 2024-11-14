import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import './App.css';

function SmallBox({ title, description, points, onShowMore }) {
  return (
    <section className="main-content">
      <div>
        <header className="header">
          <h1>{title}</h1>
          <button className="logout">⛁ {points}</button>
        </header>
        <p>{description}</p>
        <button className="show-more" onClick={onShowMore}>
          Show More
        </button>
      </div>
    </section>
  );
}

function BigBox({ title, description, points, onBack }) {
  return (
    <section className="main-content">
      <button className="show-more" onClick={onBack}>Back</button>
      <br />
      <br />
      <div>
        <header className="header">
          <h1>{title}</h1>
          <button className="logout">⛁ {points}</button>
        </header>
        <p>{description}</p>
        <p>This is a very long and pointless desctription. If you are reading this you are cool!</p>
        <p>INSERT VIDEO HERE</p>
      </div>
    </section>
  );
}


function TrainingPage() {
  const [selectedMode, setSelectedMode] = useState("Course");
  const [selectedComplete, setSelectedComplete] = useState("");
  const [showBigBox, setShowBigBox] = useState(-1);

  //Fetching Users
  const [fetchError, setFetchError] = useState(null);
  const [users, setUsers] = useState(null);
  
  useEffect(() => {
    const fetchUsers = async () => {
      console.log("Fetching users...");
      const { data, error } = await supabase
        .from("MEDIA")
        .select("");
      
      console.log("Data:", data);
      console.log("Error:", error);
  
      if (error) {
        setFetchError("Could not fetch users");
        setUsers(null);
        console.error(error);
      } else {
        setUsers(data);
        setFetchError(null);
      }
    };
  
    fetchUsers();
  }, []);
  //Fetching Users End

  return (
    <div className="container">
      <aside className="sidebar">
        <nav className="menu">
          <div className="menu-item" onClick={() => setSelectedMode("Course")}>
            Courses
          </div>
          <div className="menu-item" onClick={() => setSelectedMode("Event")}>
            Events
          </div>
        </nav>
        <h2 id="chat"></h2>
        <nav className="chat-menu">
          <ul className="chat-submenu">
            <li
              className="submenu-item"
              onClick={() => setSelectedComplete("")}
            >
                {selectedMode==="Event" ? "Upcoming" : "Not Completed"}
              
            </li>
            <li
              className="submenu-item"
              onClick={() => setSelectedComplete("Completed ")}
            >
              {selectedMode==="Event" ? "Past" : "Completed"}
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <header className="header">
          <h1>{selectedMode}s</h1>
        </header>
        <h4></h4>
        {showBigBox===-1 ? (
          <>
            {selectedMode==="Event" && selectedComplete==="" && <h4>Signed Up Events</h4>}
            {selectedMode==="Event" && selectedComplete==="Completed " && <h4>Signed Up Past Events</h4>}
            
            {users && users.map((user) => (
              <SmallBox
                key={user.id}
                title={user.TITLE}  // Adjust according to actual column names
                description={user.DESCRIPTION}
                points={user.points || 100}
                onShowMore={() => setShowBigBox(user.id)}
              />
            ))}

{/* 
            <SmallBox
              title={`${selectedComplete} ${selectedMode} 1`}
              description="Description, description"
              points={100}
              onShowMore={() => setShowBigBox(1)}
            ></SmallBox>
            <SmallBox
              title={`${selectedComplete} ${selectedMode} 2`}
              description="Description, description"
              points={100}
              onShowMore={() => setShowBigBox(2)}
            ></SmallBox>
            {selectedMode==="Event" && selectedComplete==="" && <h4>Upcoming Events</h4>}
            {selectedMode==="Event" && selectedComplete==="Completed " && <h4>Past Events</h4>}
            <SmallBox
              title={`${selectedComplete} ${selectedMode} 3`}
              description="Description, description"
              points={100}
              onShowMore={() => setShowBigBox(3)}
            ></SmallBox>
            <SmallBox
              title={`${selectedComplete} ${selectedMode} 4`}
              description="Description, description"
              points={100}
              onShowMore={() => setShowBigBox(4)}
            ></SmallBox> */}
          </>
        ) : (

          
          <BigBox
            key={user.id}
            title={user.TITLE}  // Adjust according to actual column names
            description={user.DESCRIPTION}
            points={user.points || 100}
            onShowMore={() => setShowBigBox(user.id)}
          ></BigBox>
        )}
      </main>
    </div>
  );
}

export default TrainingPage;

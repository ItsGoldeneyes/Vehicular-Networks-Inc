import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

import "./main.css";

function SmallBox({ title, description, points, date, onShowMore }) {
  const [isHovered, setIsHovered] = useState(false);

  const boxStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    cursor: "pointer",
    position: "relative",
    marginBottom: "20px",
    transition: "all 0.3s ease", // Smooth transition
    overflow: "hidden",
    maxHeight: isHovered ? "140px" : "80px", // Expand height on hover
    boxShadow: isHovered ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
  };

  const descriptionStyle = {
    marginTop: "8px",
    opacity: isHovered ? 1 : 0, // Show on hover
    transition: "opacity 0.3s ease", // Smooth fade-in
  };

  return (
    // <section className="main-content">
      <div
        style={boxStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onShowMore} // Entire box is clickable
      >
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>{title}</h1>
          <button
            style={{
              backgroundColor: "#f0f0f0",
              border: "none",
              borderRadius: "12px",
              padding: "4px 8px",
              fontSize: "14px",
            }}
          >
            ⛁ {points}
          </button>
        </header>
        <div style={descriptionStyle}>
          <p>{description}</p>
          <p> {date}</p>
        </div>
      </div>
    // {/* </section> */}
  );
}



function HomePage() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState("Course");
  const [selectedComplete, setSelectedComplete] = useState("Not Completed");

  const [fetchError, setFetchError] = useState(null);
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      const { data, error } = await supabase.from("MEDIA").select("");

      if (error) {
        setFetchError("Could not fetch media");
        setMedia(null);
      } else {
        setMedia(data);
        setFetchError(null);
      }
    };

    fetchMedia();
  }, []);

  const buttonStyle = (isSelected) => ({
    backgroundColor: isSelected ? "#b3cde8" : "#dfe7ee", // Complementary colors
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px 0", // Consistent button height
    marginBottom: "8px",
    cursor: "pointer",
    width: "100%", // Full width
    textAlign: "center",
    fontWeight: isSelected ? "bold" : "normal",
  });

  const isUpcomingEvent = (eventDate) => {
    const today = new Date();
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const eventDateObj = new Date(eventDate);
    const eventDateOnly = new Date(eventDateObj.getFullYear(), eventDateObj.getMonth(), eventDateObj.getDate()+1);   // The +1 fixes the time zone issue. 
  
    console.log("Event Date:", eventDateOnly);
    console.log("Today:", todayDateOnly);
    console.log(eventDateOnly >= todayDateOnly);
  
    return eventDateOnly >= todayDateOnly;
  };
  

  return (
    <div className="container"
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f9f9f9", // Default container background
      }}
    >
      <aside className="sidebar"
        style={{
          width: "200px", // Fixed width
          padding: "16px",
          boxShadow: "2px 0 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <b style={{ display: "block", marginBottom: "16px" }}>Menu</b>
        <nav className="menu">
          <button
            style={buttonStyle(selectedMode === "Course")}
            onClick={() => {
              setSelectedMode("Course");
              setSelectedComplete("Not Completed");
            }}
          >
            Course
          </button>
          <button
            style={buttonStyle(selectedMode === "Event")}
            onClick={() => {
              setSelectedMode("Event");
              setSelectedComplete("Not Completed");
            }}
          >
            Events
          </button>
        </nav>
        <nav className="menu">
          <button
            style={buttonStyle(selectedComplete === "Not Completed")}
            onClick={() => setSelectedComplete("Not Completed")}
          >
            {selectedMode === "Course" ? "Not Completed" : "Upcoming"}
          </button>
          <button
            style={buttonStyle(selectedComplete === "Completed")}
            onClick={() => setSelectedComplete("Completed")}
          >
            {selectedMode === "Course" ? "Completed" : "Past"}
          </button>
        </nav>
      </aside>
      <main
        className="content"
        style={{
          flex: 1,
          padding: "20px",
          backgroundColor: "#fff",
        }}
      >
        <header className="header">
          <h1>{selectedMode}s</h1>
        </header>
        <div>
          {media &&
            media
              .filter((post) =>
                selectedMode === "Course"
                  ? post.TYPE === "course"
                  : post.TYPE === "event"
              )
              .filter((post) => {
                if (selectedMode === "Event") {
                  console.log(post.TITLE)
                  if (selectedComplete === "Not Completed") {
                    return isUpcomingEvent(post.DATE); // Include only upcoming events
                  } else {
                    return !isUpcomingEvent(post.DATE); // Include only past events
                  }
                } else if (selectedMode === "Course") {
                  return selectedComplete === "Not Completed"
                    ? !post.COMPLETED // Include not completed courses
                    : post.COMPLETED; // Include completed courses
                }
                return true;
              })
              .map((post) => (
                <SmallBox
                  key={post.id}
                  title={post.TITLE}
                  description={post.DESCRIPTION}
                  date={post.DATE}
                  points={post.points || 100}
                  onShowMore={() => navigate(`/media/${post.id}`)}
                />
              ))}
        </div>
      </main>
    </div>
  );
}


export default HomePage;



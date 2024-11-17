import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

import "./main.css";

function SmallBox({ title, description, points, onShowMore }) {
  const [isHovered, setIsHovered] = useState(false);

  const boxStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    cursor: "pointer",
    position: "relative",
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
    <section className="main-content">
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
        </div>
      </div>
    </section>
  );
}



function HomePage() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState("Course");
  const [selectedComplete, setSelectedComplete] = useState("Not Completed");


  //Fetching media
  const [fetchError, setFetchError] = useState(null);
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      console.log("Fetching media...");
      const { data, error } = await supabase
        .from("MEDIA")
        .select("");

      console.log("Data:", data);
      console.log("Error:", error);

      if (error) {
        setFetchError("Could not fetch media");
        setMedia(null);
        console.error(error);
      } else {
        setMedia(data);
        setFetchError(null);
      }
    };

    fetchMedia();
  }, []);
  //Fetching media End

  console.log(media)

  return (
    <div className="container">
      <aside className="sidebar">
        <b>Menu</b>
        <br></br>
        <nav className="menu">
          <div className="menu-item" onClick={() => { setSelectedMode("Course"); setSelectedComplete("Not Completed"); }}>
            {selectedMode==="Course" ? <b>Courses</b> : "Course"}
          </div>
          <div className="menu-item" onClick={() => { setSelectedMode("Event"); setSelectedComplete("Not Completed"); }}>
            {selectedMode==="Event" ? <b>Events</b> : "Events"}
          </div>
        </nav>
        <nav className="menu">
          <div className="menu-item" onClick={() => setSelectedComplete("Not Completed")}>
            {selectedMode === "Course" && ( selectedComplete === "Not Completed" ? <b>Not Completed</b> : "Not Completed" ) }
            {selectedMode === "Event" && ( selectedComplete === "Not Completed" ? <b>Upcoming</b> : "Upcoming" ) }
          </div>
          <div className="menu-item" onClick={() => setSelectedComplete("Completed")}>
          {selectedMode === "Course" && ( selectedComplete === "Completed" ? <b>Completed</b> : "Completed" ) }
          {selectedMode === "Event" && ( selectedComplete === "Completed" ? <b>Past</b> : "Past" ) }
          </div>
        </nav>
      </aside>
      <main className="content">
        <header className="header">
          <h1>{selectedMode}s</h1>
        </header>
        <div>
        <main className="content">
              {media &&
                media
                  .filter((post) => post.TYPE === (selectedMode === "Course" ? "course" : "event"))
                  .map((post) => (
                    <SmallBox
                      key={post.id}
                      title={post.TITLE} // Adjust according to actual column names
                      description={post.DESCRIPTION}
                      points={post.points || 100}
                      onShowMore={() => navigate(`/media/${post.id}`)}
                    />
                ))}
        </main>
      </div>
      </main>
    </div>
  );
}

export default HomePage;

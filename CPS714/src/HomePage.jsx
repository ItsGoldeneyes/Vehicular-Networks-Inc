import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

import "./main.css";

function SmallBox({ title, description, points, onShowMore }) {
  return (
    <section className="main-content">
      <div>
        <header className="header">
          <h1>{title}</h1>
          <button>⛁ {points}</button>
        </header>
        <p>{description}</p>
        <button className="show-more" onClick={onShowMore}>
          Show More
        </button>
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
                media.map((post) => (
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

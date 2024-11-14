import { useEffect, useState } from "react";
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

function BigBox({ title, description, points, onBack }) {
  return (
    <section className="main-content">
      <button className="show-more" onClick={onBack}>
        Back
      </button>
      <br />
      <br />
      <div>
        <header className="header">
          <h1>{title}</h1>
          <button className="logout">⛁ {points}</button>
        </header>
        <p>{description}</p>
        <p>
          This is a very long and pointless desctription. If you are reading
          this you are cool!
        </p>
        <p>INSERT VIDEO HERE</p>
      </div>
    </section>
  );
}

function HomePage() {
  const [selectedMode, setSelectedMode] = useState("Course");
  const [selectedComplete, setSelectedComplete] = useState("");
  const [showBigBox, setShowBigBox] = useState(-1);

  //Fetching media
  const [fetchError, setFetchError] = useState(null);
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      console.log("Fetching media...");
      const { data, error } = await supabase.from("MEDIA").select("");

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
        <nav className="menu">
          <div className="menu-item" onClick={() => setSelectedMode("Course")}>
            Courses
          </div>
          <div className="menu-item" onClick={() => setSelectedMode("Event")}>
            Events
          </div>
        </nav>
        <nav className="menu">
          <div className="menu-item" onClick={() => setSelectedComplete("")}>
            {selectedMode === "Event" ? "Upcoming" : "Not Completed"}
          </div>
          <div className="menu-item" onClick={() => setSelectedComplete("Completed ")}>
            {selectedMode === "Event" ? "Past" : "Completed"}
          </div>
        </nav>
      </aside>
      <main className="content">
        <header className="header">
          <h1>{selectedMode}s</h1>
        </header>
        {showBigBox === -1 ? (
          <>
            {selectedMode === "Event" && selectedComplete === "" && (
              <h4>Signed Up Events</h4>
            )}
            {selectedMode === "Event" && selectedComplete === "Completed " && (
              <h4>Signed Up Past Events</h4>
            )}

            {media &&
              media.map((user) => (
                <SmallBox
                  key={user.id}
                  title={user.TITLE} // Adjust according to actual column names
                  description={user.DESCRIPTION}
                  points={user.points || 100}
                  onShowMore={() => setShowBigBox(user.id)}
                />
              ))}
          </>
        ) : (
          <BigBox
            key={user.id}
            title={user.TITLE} // Adjust according to actual column names
            description={user.DESCRIPTION}
            points={user.points || 100}
            onShowMore={() => setShowBigBox(user.id)}
          ></BigBox>
        )}
      </main>
    </div>
  );
}

export default HomePage;

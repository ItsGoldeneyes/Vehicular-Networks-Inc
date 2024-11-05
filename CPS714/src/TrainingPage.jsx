import { useState } from "react";

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

function BigBox({ title, description, points }) {
  return (
    <section className="main-content">
      <button className="show-more">Back</button>
      <br />
      <br />
      <div>
        <header className="header">
          <h1>{title}</h1>
          <button className="logout">⛁ {points}</button>
        </header>
        <p>{description}</p>
      </div>
    </section>
  );
}

function TrainingPage() {
  const [selectedMode, setSelectedMode] = useState("Course");
  const [selectedComplete, setSelectedComplete] = useState("");
  const [showSmallBoxes, setShowSmallBoxes] = useState(true);

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
              Not Completed
            </li>
            <li
              className="submenu-item"
              onClick={() => setSelectedComplete("Completed ")}
            >
              Completed
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <header className="header">
          <h1>{selectedMode}s</h1>
        </header>
        <h4></h4>
        {showSmallBoxes ? (
          <>
            <SmallBox
              title={`${selectedComplete} ${selectedMode} 1`}
              description="Description, description"
              points={100}
              onShowMore={() => setShowSmallBoxes(false)}
            ></SmallBox>
            <SmallBox
              title={`${selectedComplete} ${selectedMode} 2`}
              description="Description, description"
              points={100}
            ></SmallBox>
            <SmallBox
              title={`${selectedComplete} ${selectedMode} 3`}
              description="Description, description"
              points={100}
            ></SmallBox>
          </>
        ):
        <BigBox
        title={`${selectedComplete} ${selectedMode} 3`}
        description="Description, description"
        points={100}
      ></BigBox>
        }
      </main>
    </div>
  );
}

export default TrainingPage;

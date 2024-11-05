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
        <p>INSERT VIDEO HERE</p>
      </div>
    </section>
  );
}

function TrainingPage() {
  const [selectedMode, setSelectedMode] = useState("Course");
  const [selectedComplete, setSelectedComplete] = useState("");
  const [showBigBox, setShowBigBox] = useState(-1);

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
        {showBigBox===-1 ? (
          <>
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
            <SmallBox
              title={`${selectedComplete} ${selectedMode} 3`}
              description="Description, description"
              points={100}
              onShowMore={() => setShowBigBox(3)}
            ></SmallBox>
          </>
        ) : (
          <BigBox
            title={`${selectedComplete} ${selectedMode} ${showBigBox} `}
            description="Description, description"
            points={100}
            onBack={() => setShowBigBox(-1)}
          ></BigBox>
        )}
      </main>
    </div>
  );
}

export default TrainingPage;

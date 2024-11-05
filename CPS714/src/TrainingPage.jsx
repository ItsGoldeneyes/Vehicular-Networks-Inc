function TrainingPage() {
  return (
    <div className="container">
      <aside className="sidebar">
        <nav className="menu">
          <div className="menu-item">Courses</div>
          <div className="menu-item">Events</div>
        </nav>
        <h2 id="chat"></h2>
        <nav className="chat-menu">
          <ul className="chat-submenu">
            <li className="submenu-item">Not Completed</li>
            <li className="submenu-item">Completed</li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <header className="header">
          <h1>Courses</h1>
        </header>
        <h4></h4>
        <section className="main-content">
          <div>
            <header className="header">
              <h1>Course 1</h1>
              <button className="logout">⛁ 100</button>
            </header>
            <p>Description</p>
            <button className="show-more">Show More</button>
          </div>
        </section>
        <section className="main-content">
          <div>
            <header className="header">
              <h1>Course 2</h1>
              <button className="logout">⛁ 100</button>
            </header>
            <p>Description</p>
            <button className="show-more">Show More</button>
          </div>
        </section>
        <section className="main-content">
          <div>
            <header className="header">
              <h1>Course 3</h1>
              <button className="logout">⛁ 100</button>
            </header>
            <p>Description</p>
            <button className="show-more">Show More</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TrainingPage;

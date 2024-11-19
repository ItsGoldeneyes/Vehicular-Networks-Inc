import React, { useState } from "react";
import "./main.css";


function Header() {
  return (
    <header className="header">
      <div className="logo">🚚</div>
      <nav>
        <a href="#" className="active">Courses</a>
        <a href="#">Events</a>
      </nav>
      <div className="profile">
      </div>
    </header>
  );
}


function FilterBar({ filter, setFilter }) {
    return (
      <div className="filter-bar">
        <div className="filters">
          {["All", "Not Completed", "Completed"].map((option) => (
            <button
              key={option}
              className={filter === option ? "active" : ""}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="sorting">
          <button>Recency</button>
          <button className="active">Alphabetically</button>
        </div>
      </div>
    );
  }


  function CourseGrid({ courses, filter }) {
    return (
      <div className="course-grid">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    );
  }


  function CourseCard({ course }) {
    return (
      <div className="course-card">
        <img src={course.image} alt={course.title} />
        <div className="course-details">
          <span className="category">{course.category}</span>
          {course.isNew && <span className="new">New</span>}
          <h3>{course.title}</h3>
          <div className="stats">
            <span>{course.lessons} Lessons</span>
            <span>⏱ {course.duration}</span>
          </div>
        </div>
      </div>
    );
  }

function NEWHomePage() {
  const [filter, setFilter] = useState("Published");

  const courses = [
    {
      id: 1,
      category: "Adventure Sports",
      title: "Fear Of Driving And Automatic Negative Thoughts",
      lessons: 12,
      duration: "3 hr 30 min",
      image: "path/to/adventure-image.jpg",
    },
    {
      id: 2,
      category: "Sales and Operations",
      title: "Work more, Earn more while sitting at your home",
      lessons: 23,
      duration: "1 hr 30 min",
      image: "path/to/sales-image.jpg",
    },
    {
      id: 3,
      category: "Marketing",
      title: "Foundation course to understand about Software",
      lessons: 23,
      duration: "1 hr 30 min",
      image: "path/to/marketing-image.jpg",
      isNew: true,
    },
  ];

  return (
    <div className="app">
      <Header />
      <FilterBar filter={filter} setFilter={setFilter} />
      <CourseGrid courses={courses} filter={filter} />
    </div>
  );
}

export default NEWHomePage;

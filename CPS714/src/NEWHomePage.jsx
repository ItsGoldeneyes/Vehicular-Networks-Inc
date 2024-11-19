import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

import "./main.css";


  function CourseCard({ course }) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    return (
      <div 
        className="course-card" 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        // onClick={navigate(`/media/${course.id}`)} // Entire box is clickable
      >
        {/* <img src={course.image} alt={course.TITLE} /> */}
        <div className="course-details">
          <span className="category">{course.category}</span>
          {course.isNew && <span className="new">New</span>}
          <h3>{course.TITLE}</h3>
          <div className="stats">
            <span>{course.lessons} Lessons</span>
            <span>⏱ {course.duration}</span>
          </div>
          {isHovered && <span>{course.DESCRIPTION}</span>}
        </div>
      </div>
    );
  }

function NEWHomePage() {
  const [filter, setFilter] = useState("All");

  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState("Course");
  const [selectedComplete, setSelectedComplete] = useState("Not Completed");

  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true); // Set loading to true before fetching
      const { data, error } = await supabase
        .from("MEDIA")
        .select("");

      if (error) {
        setFetchError("Could not fetch media");
        setMedia(null);
      } else {
        setMedia(data);
        setFetchError(null);
      }
      setLoading(false); // Set loading to false after fetching
    };

    fetchMedia();
  }, []);

  const userID = 1;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // Set loading to true before fetching
      const { data, error } = await supabase
        .from("USERS")
        .select("")
        .eq('id', userID)
        .single();

      if (error) {
        setFetchError("Could not fetch media");
        setUser(null);
      } else {
        setUser(data);
        setFetchError(null);
      }
      setLoading(false); // Set loading to false after fetching
    };

    fetchUser();
  }, []);


  if (loading || !user || !media) {
    return (
          <p>Loading data...</p>
    );
  }
  


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
      <header className="header">
      <div className="logo">🚚</div>
      <nav>
        <a href="#" className="active">Courses</a>
        <a href="#">Events</a>
      </nav>
      <div className="profile">
      </div>
    </header>
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
      <div className="course-grid">
        {media.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default NEWHomePage;

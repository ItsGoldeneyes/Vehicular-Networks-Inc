import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

import "./main.css";

// Helper function to truncate descriptions
const getShortDescription = (desc) =>
  desc.length > 100 ? desc.substring(0, 100) + "..." : desc;

function CourseCard({ course, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="course-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick} // Entire box is clickable
    >
      <div className="course-details">
        <span className="category">{course.category || "Category: Driving"}</span>
        <h3>{course.TITLE}</h3>
        <div className="stats">
          <span>{course.lessons || 1} Lessons</span>
          <span>⏱ {course.duration || "1h 30m"}</span>
        </div>
        {isHovered && (
          <>
            <br />
            <span>{getShortDescription(course.DESCRIPTION)}</span>
          </>
        )}
      </div>
    </div>
  );
}

function NEWHomePage() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState("Courses");
  const [filter, setFilter] = useState("All");
  const [filter2, setFilter2] = useState("Recency");

  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("MEDIA").select("");

      if (error) {
        setFetchError("Could not fetch media");
        setMedia(null);
      } else {
        setMedia(data);
        setFetchError(null);
      }
      setLoading(false);
    };

    fetchMedia();
  }, []);

  const userID = 1;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("USERS")
        .select("")
        .eq("id", userID)
        .single();

      if (error) {
        setFetchError("Could not fetch user data");
        setUser(null);
      } else {
        setUser(data);
        setFetchError(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

//   console.log(loading)
//   console.log(user)
//   console.log(media)
  if (loading || !user || !media) {
    return <p>Loading data...</p>;
  }

  const isUpcomingEvent = (eventDate) => {
    const today = new Date();
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const eventDateObj = new Date(eventDate);
    const eventDateOnly = new Date(
      eventDateObj.getFullYear(),
      eventDateObj.getMonth(),
      eventDateObj.getDate() + 1
    ); // The +1 fixes the time zone issue.

    console.log("Event Date:", eventDateOnly);
    console.log("Today:", todayDateOnly);
    console.log(eventDateOnly >= todayDateOnly);

    return eventDateOnly >= todayDateOnly;
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">🚚</div>
        <nav>
          <a
            href="#"
            className={selectedMode === "Courses" && "active"}
            onClick={() => {
              setSelectedMode("Courses");
              setFilter("All");
              setFilter2("Recency");
            }}
          >
            Courses
          </a>
          <a
            href="#"
            className={selectedMode === "Events" && "active"}
            onClick={() => {
              setSelectedMode("Events");
              setFilter("All");
              setFilter2("Recency");
            }}
          >
            Events
          </a>
        </nav>
        <div className="profile"></div>
      </header>
      <div className="filter-bar">
        <div className="filters">
          {(selectedMode === "Courses"
            ? ["All", "Not Completed", "Completed"]
            : ["All", "Upcoming", "Past"]
          ).map((option) => (
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
          <button
            className={filter2 === "Recency" && "active"}
            onClick={() => {
              setFilter2("Recency");
            }}
          >
            Recency
          </button>
          <button
            className={filter2 === "Alphabetically" && "active"}
            onClick={() => {
              setFilter2("Alphabetically");
            }}
          >
            Alphabetically
          </button>
        </div>
      </div>
      <div className="course-grid">
        {media &&
            media
                // Step 1: Filter media based on type
                .filter((post) =>
                    selectedMode === "Courses" ? post.TYPE === "course" : post.TYPE === "event"
                )
                // Step 2: Filter media based on filter
                .filter((post) => {
                    if (selectedMode === "Events") {
                        if (filter === "All"){
                            return true;
                        } else if (filter === "Upcoming") {
                            return isUpcomingEvent(post.DATE); // Include only upcoming events
                        } else {
                            return !isUpcomingEvent(post.DATE); // Include only past events
                        }
                    } else if (selectedMode === "Courses") {
                        if (filter === "All"){
                            return true;
                        } else if (filter === "Not Completed") {
                            return !user.COMPLETED_COURSES.includes(post.id); // Exclude completed courses
                        } else {
                            return user.COMPLETED_COURSES.includes(post.id); // Include only completed courses
                        }
                    }
                })
                // Step 2: Sort media based on filter2
                .sort((a, b) => {
                    if (filter2 === "Recency") {
                    // Sort by recency: Compare created_at or event_date (if available)
                    const dateA = new Date(a.created_at || a.event_date || 0);
                    const dateB = new Date(b.created_at || b.event_date || 0);
                    return dateB - dateA; // Most recent first
                    } else if (filter2 === "Alphabetically") {
                    // Sort by title alphabetically
                    return a.TITLE.localeCompare(b.TITLE);
                    }
                    return 0; // Default no sorting
                })
                // Step 3: Render sorted and filtered media
                .map((post) => (
                    <CourseCard key={post.id} course={post} onClick={() => navigate(`/media/${post.id}`)} />
                ))}
                
      </div>
    </div>
  );
}

export default NEWHomePage;

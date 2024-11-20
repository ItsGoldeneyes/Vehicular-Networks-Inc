import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import supabase from '../supabaseClient';
import "./main.css";

function FullScreenMedia() {
    const { id: mediaId } = useParams(); // Get the course ID from URL parameters

     //Fetching media
    const [fetchError, setFetchError] = useState(null);
    const [media, setMedia] = useState(null);

    useEffect(() => {
        const fetchMedia = async () => {
          console.log("Fetching media...");
          const { data, error } = await supabase
            .from("MEDIA")
            .select("*")
            .eq("id", mediaId)
            .single();
    
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
      }, [mediaId]); // Ensure effect runs when mediaId changes
    //Fetching media End


    return (
      <section style={{
        margin: "20px 100px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      }}
       className="main-content">
        <button className="show-more">
            <Link
        to="/"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: "#f05a5b",
          color: "white",
          textAlign: "center",
          borderRadius: "4px",
          textDecoration: "none",
          fontWeight: "bold",
          cursor: "pointer",
          marginTop: "20px",
        }}
        >
          Back
        </Link>
        </button> 
        <br />
        <br />
        {fetchError && <p className="error">{fetchError}</p>}
        {media ? (
          <div>
            <h1
              style={{
                padding: "10px 20px",
                // color: "darkgrey",
                textAlign: "left",
                borderRadius: "4px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "45px",
                margin: "8px 0",
              }}
            >
              {media.TITLE}
            </h1>
            <div
              style={{
                width: "500px", // Length of the bar
                height: "4px", // Thickness of the bar
                backgroundColor: "grey",
                borderRadius: "2px", // Rounding the ends
                margin: "40px 20px", // Space above and below the bar
              }}
            ></div>
            <button style={{
                margin: "0px 0px 100px 20px", // Space above and below the bar
              }}>⛁ {media.POINTS}</button>
            <p style={{
                // textAlign: "center",
                margin: "0px 0px 100px 20px", // Space above and below the bar
              }} 
              dangerouslySetInnerHTML={{ __html: media.DESCRIPTION }}></p>
          <div style={{
            textAlign: "right",
          }}>
          <button style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            textAlign: "right",
            borderRadius: "100px",
            textDecoration: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
            className="completed"
            onClick={() => {
              //put something here for completed
            }}
          >Completed</button>
          </div>
          </div>
        ) : (
          !fetchError && <p>Loading...</p> // Show loading message if media is not yet available
        )}
        </section>
    );
}

export default FullScreenMedia;

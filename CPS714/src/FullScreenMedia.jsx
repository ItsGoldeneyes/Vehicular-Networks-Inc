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
      <section className="main-content">
        <button className="show-more">
            <Link
        to="/"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: "#007bff",
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
              }}>⛁ 100</button>
            <p style={{
                margin: "0px 0px 100px 20px", // Space above and below the bar
              }} 
              dangerouslySetInnerHTML={{ __html: media.DESCRIPTION }}></p>
          </div>
        ) : (
          !fetchError && <p>Loading...</p> // Show loading message if media is not yet available
        )}
        </section>
    );
}

export default FullScreenMedia;

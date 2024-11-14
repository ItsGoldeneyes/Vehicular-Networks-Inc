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
            <Link to="/">Back</Link>
        </button> 
        <br />
        <br />
        {fetchError && <p className="error">{fetchError}</p>}
        {media ? (
            <div>
            <header className="header">
                <h1>{media.TITLE}</h1>
                <button>⛁ 100</button>
            </header>
            <p>{media.DESCRIPTION}</p>
            </div>
        ) : (
            !fetchError && <p>Loading...</p> // Show loading message if media is not yet available
        )}
        </section>
    );
}

export default FullScreenMedia;

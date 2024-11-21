import React, { useState, useEffect } from "react";
import "./Surveys.css"; // Import the CSS file
import { useTheme } from "../../context/ThemeContext";
import { useSurvey } from "../../context/SurveyContext";
import { useUser } from "../../context/UserContext";

export default function Surveys() {
  const { theme } = useTheme();
  const [forms, setForms] = useState([]);
  const { getAllForms, loading } = useSurvey();
  const { user } = useUser();

  useEffect(() => {
    getForms();
    document.title = "Surveys - FleetRewards";
  }, []);

  const getForms = async () => {
    try {
      const res = await getAllForms({
        requested_by: user.user_id
      });
      if (res.status === 200) {
        setForms(res.forms);
      }
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <div className={`surveys ${theme}`}>
      <h2>Incomplete Surveys</h2>
      {loading && <p>Loading...</p>}
      <div className="survey-list">
        {
          forms.map(form => (
            <div key={form.form_id} className="survey-card">
              <h3 className="survey-title">{form.name}</h3>
              <p className="survey-points">Points: {form.points}</p>
              <button className="survey-button">Take Survey</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

import { NavLink, Outlet } from "react-router-dom";
import "./RootLayout.css";
import search_icon_light from "../Assets/search-w.png";
import search_icon_dark from "../Assets/search-b.png";
import React, { useEffect, useState } from "react";
import { Button, Switch } from "@mui/material";
import { useUser } from "../context/UserContext";

export default function RootLayout() {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");
  const toggle_mode = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };

  const { user, userLogOut } = useUser();

  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);

  return (
    <div className="root-layout">
      <div className={`container ${theme}`}>
        <div className="navbar" theme={theme} setTheme={setTheme}>
          {/* <img src="" alt="" className='logo'/> - for logo */}
          <h1 className="logo">FleetRewards</h1>

          <nav>
            <ul className="nav-links">
              <li>
                <NavLink to="/" className="nav-item">
                  Home
                </NavLink>
              </li>
              { user && <>
                <li>
                  <NavLink to="/surveys" className="nav-item">
                    Surveys
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/polls" className="nav-item">
                    Polls
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/feedback"
                    className={({ isActive }) =>
                      isActive ? "nav-item active" : "nav-item"
                    }
                  >
                    Feedback Form
                  </NavLink>
                </li>
              </>}
              { user ?
                <li>
                  <Button component={NavLink} onClick={userLogOut}>
                    Logout
                  </Button>
                </li> :
                <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                      }
                    >
                      Login
                    </NavLink> 
                </li>
              }
            </ul>
          </nav>
          <div className="search-box">
            <input type="text" placeholder="Search" />
            <img
              src={theme == "light" ? search_icon_light : search_icon_dark}
              alt=""
            />
          </div>

          {/* <img onClick={()=>{toggle_mode()}} src={theme == 'light' ? toggle_light : toggle_dark} alt="" className='toggle-icon'/> */}
          <div className="theme-toggle">
            <Switch
              checked={theme === "dark"}
              onChange={toggle_mode}
              color="primary" /* You can change the color or customize it */
            />
            <span>{theme === "light" ? "Light" : "Dark"}</span>
          </div>
        </div>
        <main>
          {" "}
          {/* This is where the main content will be rendered */}
          <Outlet context={{ theme }} />
        </main>
      </div>
    </div>
  );
}

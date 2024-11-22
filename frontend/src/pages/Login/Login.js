import React, { useEffect, useId, useState } from "react";
import styles from "./Login.module.css";
import { Navigate, NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";
import { Box, Button, TextField } from "@mui/material";

export default function Login() {
  const { theme } = useTheme();
  const usernameId = useId();
  const passId = useId();
  const [ attemptedLogin, setAttemptedLogin ] = useState(false);
  const [ loginMessage, setLoginMessage ] = useState(null);
  const { user, userAuth, isLoading } = useUser();

  useEffect(() => {
    document.title = "Login - FleetRewards";
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setAttemptedLogin(true);
    userAuth(e.target);
  }

  function updateLoginMessage() {
    if (user) {
      setLoginMessage("Login successful!");
    } else {
      setLoginMessage("Login failed.");
    }
  }

  useEffect(() => {
    if (attemptedLogin) {
      updateLoginMessage();
    }
  }, [user]);

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <>
      <div className={`home ${theme}`}>
        <div className={styles.container}>
          <h2>Log In</h2>
          <p>
            Fields marked with <span className={styles.required} /> are
            required.
          </p>
          <Box
            component="form"
            method="post"
            onSubmit={handleSubmit}
            className={styles.loginForm}
          >
            <label htmlFor={usernameId} className={styles.loginLabel}>
              Username
              <span className={styles.required} />
            </label>
            <input
              id={usernameId}
              className={styles.loginInput}
              name="username"
              type="text"
              maxLength={50}
              required
            />

            <label htmlFor={passId} className={styles.loginLabel}>
              Password
              <span className={styles.required} />
            </label>
            <input
              id={passId}
              className={styles.loginInput}
              name="password"
              type="password"
              maxLength={30}
              required
            />

            <Button type="submit" variant="contained" size="large">
              Login
            </Button>
            
            { isLoading && <p className={styles.submitInfo}>Loading...</p> }
            { loginMessage && <p className={styles.submitInfo}>{loginMessage}</p> }
          </Box>
          
          <p>
            Don't have an account?{" "}
            <NavLink to="/register">Register Now</NavLink>
          </p>
        </div>
      </div>
    </>
  );
}

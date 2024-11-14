import React, { useEffect, useId, useState } from "react";
import styles from "./Login.module.css";
import { NavLink } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function Login() {
  const usernameId = useId();
  const passId = useId();
  const { theme } = useOutletContext(); // Get theme from context
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

  return (
    <>
      <div className={`home ${theme}`}>
        <div className={styles.container}>
          <h2>Log In</h2>
          <p>
            Fields marked with <span className={styles.required} /> are
            required.
          </p>
          <form
            method="post"
            onSubmit={handleSubmit}
            className={styles.registerForm}
          >
            <label htmlFor={usernameId} className={styles.registerLabel}>
              Username
              <span className={styles.required} />
            </label>
            <input
              id={usernameId}
              className={styles.registerInput}
              name="username"
              type="text"
              maxLength={50}
              required
            />

            <label htmlFor={passId} className={styles.registerLabel}>
              Password
              <span className={styles.required} />
            </label>
            <input
              id={passId}
              className={styles.registerInput}
              name="password"
              type="password"
              maxLength={30}
              required
            />

            <button className={styles.submit} type="submit">
              Login
            </button>
          </form>
          { isLoading && <p>Loading...</p> }
          { loginMessage && <p>{loginMessage}</p> }
          
          <p>
            Don't have an account?{" "}
            <NavLink to="/register">Register Now</NavLink>
          </p>

          { user && <>
            <h3>Current User</h3>
            <p>
              User: {user.username}, Type of User: {user.profile_status}
            </p>
          </>}
        </div>
      </div>
    </>
  );
}

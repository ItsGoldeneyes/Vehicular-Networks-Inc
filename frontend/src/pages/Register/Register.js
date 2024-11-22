import React, { useEffect, useId } from "react";
import styles from "./Register.module.css";
import { Navigate, NavLink } from "react-router-dom";
import { Box, Button, Link } from "@mui/material";
import { useUser } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";

export default function Register() {
  const { theme } = useTheme();
  const nameId = useId();
  const emailId = useId();
  const passId = useId();
  const passConfirmId = useId();
  const { user, userRegister, isLoading } = useUser();

  useEffect(() => {
    document.title = "Register - FleetRewards";
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    userRegister(e.target);
  }

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <>
      <div className={`home ${theme}`}>
        <div className={styles.container}>
          <h2>Sign Up</h2>
          <p>
            Fields marked with <span className={styles.required} /> are
            required.
          </p>
          <Box
            component="form"
            method="post"
            onSubmit={handleSubmit}
            className={styles.registerForm}
          >
            <label htmlFor={nameId} className={styles.registerLabel}>
              Username
              <span className={styles.required} />
            </label>
            <input
              id={nameId}
              className={styles.registerInput}
              name="username"
              type="text"
              maxLength={20}
              required
            />

            <label htmlFor={emailId} className={styles.registerLabel}>
              Email
              <span className={styles.required} />
            </label>
            <input
              id={emailId}
              className={styles.registerInput}
              name="email"
              type="email"
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
              name="pass"
              type="password"
              maxLength={30}
              required
            />

            <label htmlFor={passConfirmId} className={styles.registerLabel}>
              Confirm Password
              <span className={styles.required} />
            </label>
            <input
              id={passConfirmId}
              className={styles.registerInput}
              name="pass-confirm"
              type="password"
              maxLength={30}
              required
            />

            <Button type="submit" variant="contained" size="large">
              Create Account
            </Button>

            { isLoading && <p className={styles.submitInfo}>Loading...</p> }
          </Box>

          <p>
            Already have an account? <Link component={NavLink} to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </>
  );
}

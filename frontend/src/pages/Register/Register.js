import React, { useEffect, useId, useState } from "react";
import styles from "./Register.module.css";
import { Navigate, NavLink } from "react-router-dom";
import { Box, Button, Link, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useUser } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";

export default function Register() {
  const { theme } = useTheme();
  const nameId = useId();
  const emailId = useId();
  const passId = useId();
  const passConfirmId = useId();
  const { user, userRegister, isLoading } = useUser();
  const [data, setData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    document.title = "Register - FleetRewards";
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setData(userRegister(e.target));
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

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
            <TextField
            id={nameId}
            label="Username"
            name="username"
            type="text"
            fullWidth
            required
            margin="normal"
            variant="outlined"
            slotProps={{
              input: {
                style: {
                  backgroundColor: theme === "dark" ? "#fff" : "#f9f9f9",
                  color: "#000", // Black text
                },
              },
              label: {
                style: {
                  color: theme === "dark" ? "#000" : "rgba(0, 0, 0, 0.6)",
                },
              },
            }}
          />
          <TextField
            id={emailId}
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            margin="normal"
            variant="outlined"
            slotProps={{
              input: {
                style: {
                  backgroundColor: theme === "dark" ? "#fff" : "#f9f9f9",
                  color: "#000", // Black text
                },
              },
              label: {
                style: {
                  color: theme === "dark" ? "#000" : "rgba(0, 0, 0, 0.6)",
                },
              },
            }}
          />
          <TextField
            id={passId}
            label="Password"
            name="pass"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            margin="normal"
            variant="outlined"
            slotProps={{
              input: {
                style: {
                  backgroundColor: theme === "dark" ? "#fff" : "#f9f9f9",
                  color: "#000",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
          />
          <TextField
            id={passConfirmId}
            label="Confirm Password"
            name="pass-confirm"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            required
            margin="normal"
            variant="outlined"
            slotProps={{
              input: {
                style: {
                  backgroundColor: theme === "dark" ? "#fff" : "#f9f9f9",
                  color: "#000",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
          />
          <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2 }}>
            Create Account
          </Button>

            { isLoading && <p className={styles.submitInfo}>Loading...</p> }
          </Box>

          <p>
          {data ? (
            <>
              You have successfully registered! <Link component={NavLink} to="/login">Login</Link> now!
            </>
          ) : (
            <>
              Already have an account? <Link component={NavLink} to="/login">Login</Link> here!
            </>
          )}
          </p>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useId, useState } from "react";
import styles from "./Login.module.css";
import { Navigate, NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";
import { Box, Button, CircularProgress, TextField, Alert, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const { theme } = useTheme();
  const usernameId = useId();
  const passId = useId();
  const [ showPassword, setShowPassword ] = useState(false);
  const { user, userAuth, isLoading } = useUser();

  useEffect(() => {
    document.title = "Login - FleetRewards";
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    userAuth(e.target);
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <>
      <div className={`home ${theme}`}>
        <div className={styles.container}>
          <h2>Log In</h2>
          <p>
            Fields marked with <span className={styles.required} /> are required.
          </p>
          <Box component="form" method="post" onSubmit={handleSubmit} className={styles.loginForm}>
            <TextField
              id={usernameId}
              label="Username"
              name="username"
              type="text"
              fullWidth
              required
              margin="normal"
              variant="outlined"
            />
            <TextField
              id={passId}
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              margin="normal"
              variant="outlined"
              slotProps={{
                input: {
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
            <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
            {isLoading && <CircularProgress sx={{ mt: 2 }} />}
          </Box>
          
          <p>
            Don't have an account? <NavLink to="/register">Register</NavLink> here!
          </p>
        </div>
      </div>
    </>
  );
}

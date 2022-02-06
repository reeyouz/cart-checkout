import React, { FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useLogin } from "./useLogin";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store";
import { routes } from "../../router";

export function Login() {
  const { credentials, handleChange } = useLogin();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await auth.signIn(credentials);
    navigate(routes.home.path, { replace: true });
  };

  const layoutStyles: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div style={layoutStyles}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              type="text"
              name="username"
              label="Username"
              value={credentials.username}
              onChange={handleChange}
              size="small"
              variant="outlined"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              type="password"
              name="password"
              label="Password"
              value={credentials.password}
              onChange={handleChange}
              size="small"
              variant="outlined"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

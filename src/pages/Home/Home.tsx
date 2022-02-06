import React, { useCallback, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../../store";
import { useNavigate } from "react-router-dom";
import { routes } from "../../router";
import { useProfile } from "./useProfile";
import { UserProfileList } from "../../components";

export function Home() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, errorDetails, hasMore, profiles } = useProfile(pageNumber);
  const observer = useRef<IntersectionObserver>();

  const endOfProfiles = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  const handleLogout = async () => {
    await signOut();
    navigate(routes.login.path);
  };

  return (
    <>
      <AppBar color="primary">
        <Toolbar style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="button"
            onClick={handleLogout}
            color="error"
            variant="contained"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <UserProfileList profiles={profiles} />
      {loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      )}
      {errorDetails.hasError && (
        <Typography variant="h6">{errorDetails.errorMessage}</Typography>
      )}
      <div id="intersection-observer" ref={endOfProfiles}></div>
    </>
  );
}

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { routes } from "./routes";
import { useAuth } from "../store";

type Props = {
  children: JSX.Element;
};
export function ProtectedRoute(props: Props) {
  const { children } = props;
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return (
      <Navigate to={routes.login.path} state={{ from: location }} replace />
    );
  }

  return children;
}

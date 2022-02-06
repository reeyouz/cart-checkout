import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Home } from "../pages";
import { ProtectedRoute } from "./ProtectedRoute";

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

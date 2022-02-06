import React from "react";
import "./App.css";
import { AppRouter } from "./router";
import { AuthProvider } from "./store";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;

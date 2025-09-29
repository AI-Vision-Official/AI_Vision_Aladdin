import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./components/Dashboard.jsx";

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

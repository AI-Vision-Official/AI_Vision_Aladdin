import React from "react";

export default function Dashboard() {
  const apps = ["Notepad", "Chat", "Files", "AI Tools"];
  return (
    <div className="dashboard">
      {apps.map(app => (
        <div key={app} className="card">
          {app}
        </div>
      ))}
    </div>
  );
}

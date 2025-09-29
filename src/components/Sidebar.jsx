import React from "react";

export default function Sidebar() {
  const items = ["Chat", "Generation", "Multimedia", "Productivity", "Settings"];
  return (
    <div className="sidebar">
      <h2>Command Center</h2>
      <ul>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

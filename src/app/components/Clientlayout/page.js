"use client";

import Startbar from "../header/Leftsidebar/page";

export default function ClientLayout({ children }) {
  return (
    <div className="app-layout d-flex">
      {/* ===== LEFT SIDEBAR ===== */}
      <div className="startbar-wrapper">
        <Startbar />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="main-wrapper flex-grow-1">
        {children}
      </div>
    </div>
  );
}

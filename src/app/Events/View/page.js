"use client";
import React, { useState } from "react";
import ClientLayout from "@/app/components/Clientlayout/page";
import { useTheme } from "@/app/components/Layout/page";
import { FaClock, FaCalendarAlt } from "react-icons/fa";

export default function ViewEvents() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("ongoing");

  // Ongoing Events
  const ongoingEvents = [
    {
      id: 1,
      title: "UI/UX Masterclass",
      description: "Learn UI/UX design with Figma and Adobe XD.",
      course: "Editing & Designing",
      eventType: "Online",
      date: "Nov 5, 2025",
      duration: "45 min",
      banner: "/images/course-banner.png",
    },
    {
      id: 2,
      title: "Digital Branding Workshop",
      description: "Create impactful digital brands using marketing tools.",
      course: "Digital Marketing",
      eventType: "Offline",
      date: "Nov 10, 2025",
      duration: "1 hr 20 min",
      banner: "/images/course-banner.png",
    },
  ];

  // Past Events
  const pastEvents = [
    {
      id: 1,
      title: "Content Creation Bootcamp",
      description: "Master digital storytelling and content publishing.",
      course: "Editing",
      eventType: "Online",
      duration: "1 hr 10 min",
      date: "Oct 10, 2025",
      banner: "/images/course-banner.png",
    },
    {
      id: 2,
      title: "SEO Mastery Workshop",
      description: "Learn SEO fundamentals and content ranking strategies.",
      course: "Digital Marketing",
      eventType: "Offline",
      duration: "2 hr 5 min",
      date: "Sep 25, 2025",
      banner: "/images/course-banner.png",
    },
  ];

  return (
    <ClientLayout>
      <div className="container py-4 course-form">
        <div className="card p-4 shadow-sm border-0">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4
              className="fw-bold mb-0"
              style={{ color: "var(--primary, #FEB614)", fontWeight: 500 }}
            >
              View Events
            </h4>
            {/* Add Event button removed */}
          </div>

          {/* Tabs */}
          <div className="d-flex gap-3 mb-4">
            <button
              className={`btn ${
                activeTab === "ongoing"
                  ? "btn-primary-theme"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setActiveTab("ongoing")}
            >
              Ongoing Events
            </button>
            <button
              className={`btn ${
                activeTab === "past"
                  ? "btn-primary-theme"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setActiveTab("past")}
            >
              Past Events
            </button>
          </div>

          {/* Ongoing Events */}
          {activeTab === "ongoing" && (
            <div className="row g-4">
              {ongoingEvents.map((event) => (
                <div key={event.id} className="col-md-4 col-sm-6">
                  <div
                    className="card h-100 border-0 shadow-sm"
                    style={{
                      border:
                        theme === "dark"
                          ? "1px solid rgba(255,255,255,0.1)"
                          : "1px solid #eee",
                      borderRadius: "10px",
                    }}
                  >
                    <img
                      src={event.banner}
                      alt={event.title}
                      className="card-img-top rounded-top"
                      style={{ height: "160px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h6
                        className="fw-semibold mb-1"
                        style={{
                          color: "var(--primary, #FEB614)",
                          fontSize: "14px",
                        }}
                      >
                        {event.course}
                      </h6>
                      <h5
                        className="fw-bold mb-2"
                        style={{ color: theme === "dark" ? "#fff" : "#000" }}
                      >
                        {event.title}
                      </h5>
                      <p
                        className="text-muted mb-3"
                        style={{
                          fontSize: "14px",
                          lineHeight: "1.5",
                        }}
                      >
                        {event.description}
                      </p>
                      <div className="d-flex align-items-center gap-2 text-muted small">
                        <FaCalendarAlt /> {event.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Past Events */}
          {activeTab === "past" && (
            <div className="row g-4">
              {pastEvents.map((event) => (
                <div key={event.id} className="col-md-4 col-sm-6">
                  <div
                    className="card h-100 border-0 shadow-sm"
                    style={{
                      border:
                        theme === "dark"
                          ? "1px solid rgba(255,255,255,0.1)"
                          : "1px solid #eee",
                      borderRadius: "10px",
                    }}
                  >
                    <img
                      src={event.banner}
                      alt={event.title}
                      className="card-img-top rounded-top"
                      style={{ height: "160px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h6
                        className="fw-semibold mb-1"
                        style={{
                          color: "var(--primary, #FEB614)",
                          fontSize: "14px",
                        }}
                      >
                        {event.course}
                      </h6>
                      <h5
                        className="fw-bold mb-2"
                        style={{ color: theme === "dark" ? "#fff" : "#000" }}
                      >
                        {event.title}
                      </h5>
                      <p
                        className="text-muted mb-3"
                        style={{
                          fontSize: "14px",
                          lineHeight: "1.5",
                        }}
                      >
                        {event.description}
                      </p>
                      <div className="d-flex align-items-center justify-content-between text-muted small">
                        <div className="d-flex align-items-center gap-2">
                          <FaClock /> {event.duration}
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <FaCalendarAlt /> {event.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
}

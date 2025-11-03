"use client";

import { useEffect } from "react";
import ClientLayout from "../components/Clientlayout/page";
import { useTheme } from "../components/Layout/page";

export default function DashboardPage() {
  const { theme } = useTheme();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js")
      .then(() => console.log("Bootstrap loaded successfully"))
      .catch((err) => console.error("Bootstrap loading failed:", err));
  }, []);

  return (
    <ClientLayout>
      <div className="container-fluid">
        <div className="row">
          {/* ===== Left part - 8 columns ===== */}
          <div className="col-md-8">
            <div className="p-3">
              {/* ===== Header Cards Row ===== */}
              <div className="header-cards-row mb-4">
                {/* Hello Card */}
                <div className="header-card">
                  <div>
                    <h5>
                      Hello <span className="brand-accent">John!</span>
                    </h5>
                    <small>Happy to see you.</small>
                  </div>

                  <img
                    key={theme}
                    src={
                      theme === "dark"
                        ? "/images/hello-dark.png"
                        : "/images/hello.png"
                    }
                    alt="Hello"
                    className="hello-img"
                    width="60"
                    height="60"
                  />
                </div>

                {/* Challenges Card */}
                <div className="header-card">
                  <div>
                    <p className="mb-1 fw-semibold">Challenges</p>
                    <h3>01</h3>
                    <div className="progress mt-2" style={{ height: "6px" }}>
                      <div
                        className="progress-bar bg-warning"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                    <small>1 out of 2 is Done</small>
                  </div>
                </div>

                {/* Refer a Friend Card */}
                <div className="header-card">
                  <div>
                    <p className="mb-1 fw-semibold">Refer a Friend</p>
                    <small>Click here to share a link</small>
                  </div>
                </div>
              </div>

              {/* ===== Week Schedule Section ===== */}
              <div
                className={`card mt-4 shadow-sm border-0 ${
                  theme === "dark"
                    ? "bg-dark text-light"
                    : "bg-light text-dark"
                }`}
              >
                <div className="card-header border-0">
                  <h4 className="card-title text-warning">Week Schedule</h4>
                </div>
                <div className="card-body">
                  <div className="accordion" id="weekSchedule">
                    {[
                      {
                        id: "session1",
                        title: "1. Session 1 - Introduction",
                        body: "Overview of the course and getting started with basics.",
                      },
                      {
                        id: "session2",
                        title: "2. Session 2 - Basics",
                        body: "Core fundamentals explained in detail.",
                      },
                      {
                        id: "session3",
                        title: "3. Session 3 - Advance",
                        body: "Advanced topics with real-world use cases.",
                      },
                      {
                        id: "session4",
                        title: "4. Session 4 - Recap",
                        body: "Refresher and recap of concepts.",
                      },
                      {
                        id: "session5",
                        title: "5. Session 5 - Workshop",
                        body: "Hands-on project and Q&A.",
                      },
                    ].map((session) => (
                      <div
                        className="accordion-item mb-2 border-0"
                        key={session.id}
                      >
                        <h2 className="accordion-header">
                          <button
                            className={`accordion-button collapsed fw-semibold ${
                              theme === "dark"
                                ? "bg-secondary text-light"
                                : "bg-white text-dark"
                            }`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${session.id}`}
                          >
                            {session.title}
                          </button>
                        </h2>

                        <div
                          id={session.id}
                          className="accordion-collapse collapse"
                          data-bs-parent="#weekSchedule"
                        >
                          <div
                            className={`accordion-body ${
                              theme === "dark"
                                ? "bg-dark text-light border-start border-warning"
                                : "bg-light text-dark border-start border-warning"
                            }`}
                          >
                            {session.body}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="dashboard-right">
              {/* Events Card */}
              <div className="right-card mb-3">
                <div className="card-header">
                  <h3>Events</h3>
                  <a href="#" className="view-link">
                    View →
                  </a>
                </div>

                <ul className="event-list">
                  <li>
                    <span className="event-title">🎯 Weekly Goal Challenge</span>
                    <span className="event-date">Oct 28 – Nov 3</span>
                  </li>
                  <li>
                    <span className="event-title">🎙️ Industry Insights Podcast</span>
                    <span className="event-date">Oct 30</span>
                  </li>
                  <li>
                    <span className="event-title">🎯 Weekly Goal Challenge</span>
                    <span className="event-date">Oct 28 – Nov 3</span>
                  </li>
                  <li>
                    <span className="event-title">🎙️ Industry Insights Podcast</span>
                    <span className="event-date">Oct 30</span>
                  </li>
                  <li>
                    <span className="event-title">🎯 Weekly Goal Challenge</span>
                    <span className="event-date">Oct 28 – Nov 3</span>
                  </li>
                  <li>
                    <span className="event-title">🎙️ Industry Insights Podcast</span>
                    <span className="event-date">Oct 30</span>
                  </li>
                </ul>
              </div>

              {/* Leaderboard Card */}
              <div className="right-card mb-3">
                <div className="card-header">
                  <h3>Leaderboard</h3>
                  <a href="#" className="view-link">
                    View →
                  </a>
                </div>
                <div className="leaderboard-content">
                  <strong>Bronze IV</strong>
                  <p>Jognipally B.R. Engineering College (JBEC)</p>
                  <p>Rank: Nil (Need ⚡ 99 more)</p>
                </div>
              </div>

              {/* Learning Consistency Card */}
              <div className="right-card mb-3">
                <div className="card-header">
                  Learning Consistency{" "}
                  <span className="goal-label">Goal 🔥 90</span>
                </div>
                <div className="consistency-content">
                  <div>
                    <span>Current Streak</span>
                    <span className="streak">🔥 1</span>
                    <span className="best">My Best ⚡ 86</span>
                  </div>
                  <div>
                    <span>Consistency Score</span>
                    <span className="score">⚡ 1 ↑1</span>
                  </div>
                </div>
              </div>

              {/* Help Button */}
              <button className="help-btn">Help</button>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}

"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import ClientLayout from "@/app/components/Clientlayout/page";
import { useTheme } from "@/app/components/Layout/page";

export default function ViewCoursePage() {
  const { theme } = useTheme();
  const [activeCourse, setActiveCourse] = useState(null);
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [animatedProgress, setAnimatedProgress] = useState({});
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [watchedData, setWatchedData] = useState({});
  const intervalsRef = useRef({});

  // 🧠 Load watched state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("watchedEpisodes");
    if (stored) setWatchedData(JSON.parse(stored));
  }, []);

  // 💾 Save watched state to localStorage
  useEffect(() => {
    localStorage.setItem("watchedEpisodes", JSON.stringify(watchedData));
  }, [watchedData]);

  // Sample course data
  const courses = [
    {
      id: 1,
      category: "Client Management",
      title: "Building and maintaining strong relationships",
      duration: "45min",
      tutor: "Durga Sai",
      image: "/images/course.png",
      progress: 60,
      description:
        "Learn how to communicate effectively, handle client expectations, and maintain long-term professional relationships.",
      episodes: [
        { id: 1, title: "Introduction to Client Handling", duration: "20 mins", src: "/videos/sample1.mp4" },
        { id: 2, title: "Understanding Client Requirements", duration: "25 mins", src: "/videos/sample2.mp4" },
        { id: 3, title: "Communication Basics", duration: "15 mins", src: "/videos/sample3.mp4" },
      ],
    },
    {
      id: 2,
      category: "Content Creation",
      title:
        "Process of planning, creating, organizing, and publishing digital content",
      duration: "1h 25min",
      tutor: "Karan",
      image: "/images/course.png",
      progress: 80,
      description:
        "Master the workflow of content creation — from ideation to publishing across platforms.",
      episodes: [
        { id: 1, title: "Introduction to Content Strategy", duration: "20 mins", src: "/videos/sample1.mp4" },
        { id: 2, title: "Content Planning and Workflow", duration: "25 mins", src: "/videos/sample2.mp4" },
        { id: 3, title: "Publishing and Optimization", duration: "30 mins", src: "/videos/sample3.mp4" },
      ],
    },
    {
      id: 3,
      category: "Advanced Marketing",
      title: "Data-driven marketing strategy for enterprises",
      duration: "2h 10min",
      tutor: "Ramu",
      image: "/images/course.png",
      progress: 100,
      description:
        "Leverage analytics and automation tools to enhance marketing ROI effectively.",
      episodes: [
        { id: 1, title: "Understanding Campaign Metrics", duration: "25 mins", src: "/videos/sample1.mp4" },
        { id: 2, title: "Marketing Automation", duration: "35 mins", src: "/videos/sample2.mp4" },
      ],
    },
  ];

  // ===========================
  // 🔸 PROGRESS ANIMATION LOGIC
  // ===========================
  const startProgressAnimation = (id, endValue) => {
    if (endValue === 100) {
      setAnimatedProgress((prev) => ({ ...prev, [id]: 100 }));
      return;
    }

    clearInterval(intervalsRef.current[id]);
    let current = 0;
    const duration = 1000;
    const stepTime = 20;
    const increment = endValue / (duration / stepTime);

    const interval = setInterval(() => {
      current += increment;
      setAnimatedProgress((prev) => ({
        ...prev,
        [id]: Math.min(Math.floor(current), endValue),
      }));

      if (current >= endValue) {
        clearInterval(interval);
        delete intervalsRef.current[id];
      }
    }, stepTime);

    intervalsRef.current[id] = interval;
  };

  const handleMouseEnter = (course) => {
    setHoveredCourse(course.id);
    if (
      !animatedProgress[course.id] ||
      animatedProgress[course.id] < course.progress
    ) {
      setAnimatedProgress((prev) => ({ ...prev, [course.id]: 0 }));
      startProgressAnimation(course.id, course.progress);
    }
  };

  const handleCourseClick = (course) => {
    setAnimatedProgress((prev) => ({
      ...prev,
      [course.id]: course.progress,
    }));
    Object.values(intervalsRef.current).forEach(clearInterval);
    intervalsRef.current = {};
    setActiveCourse(course);
  };

  useEffect(() => {
    if (!activeCourse) {
      const resetState = {};
      courses.forEach((c) => {
        resetState[c.id] = c.progress;
      });
      setAnimatedProgress(resetState);
    }
  }, [activeCourse]);

  // ===========================
  // 🔹 EPISODE WATCH TRACKING
  // ===========================
  const handleWatchProgress = (courseId, episodeId, current, duration) => {
    const progress = (current / duration) * 100;
    if (progress >= 90) {
      setWatchedData((prev) => ({
        ...prev,
        [courseId]: {
          ...(prev[courseId] || {}),
          [episodeId]: true,
        },
      }));
    }
  };

  return (
    <ClientLayout>
      <div className={`view-course-page ${theme}`}>
        {/* ---------- HEADER ---------- */}
        <div className="course-header">
          {!activeCourse ? (
            <h2 className="page-title">Courses</h2>
          ) : (
            <>
              <h2 className="course-name-highlight">{activeCourse.category}</h2>
              <div className="breadcrumb">
                <span
                  className="breadcrumb-link"
                  onClick={() => setActiveCourse(null)}
                >
                  Courses
                </span>
                <span className="breadcrumb-sep">›</span>
                <span className="breadcrumb-active">{activeCourse.category}</span>
              </div>
            </>
          )}
        </div>

        {/* ---------- BODY ---------- */}
        {!activeCourse ? (
          // GRID VIEW
          <div className="course-grid">
            {courses.map((course) => {
              const progressValue =
                animatedProgress[course.id] ??
                (course.progress === 100 ? 100 : 0);

              return (
                <div
                  key={course.id}
                  className={`course-card ${
                    hoveredCourse === course.id ? "active" : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(course)}
                  onClick={() => handleCourseClick(course)}
                >
                  <div className="course-thumb">
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={400}
                      height={200}
                      className="thumb-img"
                    />
                  </div>

                  <div className="course-content">
                    <div className="course-category-row">
                      <p className="course-category">{course.category}</p>

                      <div
                        className="progress-arc"
                        style={{ "--progress": `${progressValue}` }}
                      >
                        <svg viewBox="0 0 100 50" className="progress-arc-svg">
                          <path
                            className="progress-bg"
                            d="M10,50 A40,40 0 0,1 90,50"
                          />
                          <path
                            className="progress-fill"
                            d="M10,50 A40,40 0 0,1 90,50"
                            style={{
                              strokeDashoffset: `calc(126 - (${
                                progressValue * 126
                              } / 100))`,
                            }}
                          />
                        </svg>
                        <span className="progress-text">{progressValue}%</span>
                      </div>
                    </div>

                    <h3 className="course-title">{course.title}</h3>

                    <div className="course-meta">
                      <span className="course-time">⏱ {course.duration}</span>
                      <span className="course-tutor">👤 {course.tutor}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // DETAIL VIEW
          <div className="course-detail">
            <p className="course-description">{activeCourse.description}</p>

            <div className="course-episodes">
              <h3 className="episode-heading">Course Content</h3>
              <div className="episode-list">
                {activeCourse.episodes.map((ep) => {
                  const watched = watchedData[activeCourse.id]?.[ep.id] ?? false;
                  return (
                    <div
                      key={ep.id}
                      className="episode-card"
                      onClick={() => setSelectedEpisode(ep)}
                    >
                      <div className="episode-info">
                        <div
                          className={`episode-icon ${
                            watched ? "completed" : "pending"
                          }`}
                        ></div>
                        <div>
                          <p className="episode-title">{ep.title}</p>
                          <span className="episode-time">⏱ {ep.duration}</span>
                        </div>
                      </div>
                      <FaArrowRight className="episode-arrow" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 🎥 VIDEO PLAYER */}
        {selectedEpisode && (
          <div className="video-overlay">
            <div className="video-container">
              <h3 className="video-title">{selectedEpisode.title}</h3>
              <video
                src={selectedEpisode.src}
                controls
                autoPlay
                onTimeUpdate={(e) =>
                  handleWatchProgress(
                    activeCourse.id,
                    selectedEpisode.id,
                    e.target.currentTime,
                    e.target.duration
                  )
                }
                className="video-player"
              />
              <button
                className="close-btn"
                onClick={() => setSelectedEpisode(null)}
              >
                ✖
              </button>
            </div>
          </div>
        )}
      </div>
    </ClientLayout>
  );
}

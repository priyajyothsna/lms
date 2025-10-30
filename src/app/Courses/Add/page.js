"use client";

import React, { useState } from "react";
import Link from "next/link";
import ClientLayout from "@/app/components/Clientlayout/page";
import { useTheme } from "@/app/components/Layout/page";
import toast, { Toaster } from "react-hot-toast";

export default function AddCoursePage() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    courseName: "",
    duration: "",
    description: "",
    tool: "",
    lectureName: "",
    videoLink: "",
    blockDescription: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.courseName ||
      !formData.duration ||
      !formData.description ||
      !formData.tool ||
      !formData.videoLink ||
      !formData.blockDescription
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    toast.success(`🎉 Course “${formData.courseName}” created successfully!`);
    console.log("Course Data Submitted:", formData);

    setFormData({
      courseName: "",
      duration: "",
      description: "",
      tool: "",
      lectureName: "",
      videoLink: "",
      blockDescription: "",
    });
  };

  return (
    <ClientLayout>
      <div className="container py-4 course-form">
        <Toaster position="top-right" />
        <div className="card p-4 shadow-sm border-0">
          {/* ---------- Header with breadcrumb ---------- */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4
              className="fw-bold mb-0"
              style={{
                color: "var(--primary, #FEB614)",
                fontWeight: 700,
              }}
            >
              Add New Course
            </h4>

            {/* Breadcrumb */}
            <div
              className="breadcrumb-text"
              style={{
                fontSize: "0.95rem",
                fontWeight: 500,
              }}
            >
              <Link
                href="/Courses/View"
                style={{
                  color: theme === "dark" ? "#bbb" : "#666",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--primary, #FEB614)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color =
                    theme === "dark" ? "#bbb" : "#666")
                }
              >
                Courses
              </Link>
              <span
                style={{
                  color: theme === "dark" ? "#bbb" : "#666",
                  margin: "0 6px",
                }}
              >
                /
              </span>
              <span
                style={{
                  color: "var(--primary, #FEB614)",
                  fontWeight: 600,
                }}
              >
                Add Course
              </span>
            </div>
          </div>

          {/* ---------- Form ---------- */}
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Course Name */}
              <div className="col-md-6">
                <label className="form-label">
                  Course Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  placeholder="Enter course name"
                  className="form-control"
                  required
                />
              </div>

              {/* Duration */}
              <div className="col-md-6">
                <label className="form-label">
                  Duration <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 6 weeks / 20 hours"
                  className="form-control"
                  required
                />
              </div>

              {/* Description */}
              <div className="col-12">
                <label className="form-label">
                  Course Description <span className="text-danger">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter course description"
                  className="form-control"
                  required
                ></textarea>
              </div>

              {/* Tool / Platform */}
              <div className="col-md-4">
                <label className="form-label">
                  Tool / Platform <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="tool"
                  value={formData.tool}
                  onChange={handleChange}
                  placeholder="e.g. Figma"
                  className="form-control"
                  required
                />
              </div>

              {/* Lecture / Instructor Name */}
              <div className="col-md-4">
                <label className="form-label">Lecture / Instructor Name</label>
                <input
                  type="text"
                  name="lectureName"
                  value={formData.lectureName}
                  onChange={handleChange}
                  placeholder="e.g. Sai"
                  className="form-control"
                />
              </div>

              {/* Video Link */}
              <div className="col-md-4">
                <label className="form-label">
                  Video Link <span className="text-danger">*</span>
                </label>
                <input
                  type="url"
                  name="videoLink"
                  value={formData.videoLink}
                  onChange={handleChange}
                  placeholder="https://youtu.be/VIDEO_ID"
                  className="form-control"
                  required
                />
              </div>

              {/* Block Description */}
              <div className="col-12">
                <label className="form-label">
                  Block Topic / Description{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="blockDescription"
                  value={formData.blockDescription}
                  onChange={handleChange}
                  placeholder="e.g. Introduction to Figma"
                  className="form-control"
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-end mt-4 gap-3">
              <button type="submit" className="btn btn-primary-theme">
                Save Course
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => window.history.back()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </ClientLayout>
  );
}

"use client";
import React, { useState } from "react";
import ClientLayout from "@/app/components/Clientlayout/page";
import { useTheme } from "@/app/components/Layout/page";
import toast, { Toaster } from "react-hot-toast";

export default function AddEvent() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    eventName: "",
    description: "",
    eventType: "",
    courseEnrolled: "",
    eventLink: "",
    date: "",
    time: "",
    duration: "",
    host: "",
    eventPoster: null,
  });

  const [preview, setPreview] = useState(null);
  const today = new Date().toISOString().split("T")[0];

  // ✅ Handle text/select changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Reset courseEnrolled if eventType changes
    if (name === "eventType") {
      setFormData((prev) => ({
        ...prev,
        eventType: value,
        courseEnrolled: "", // reset dependent field
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, eventPoster: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.eventName ||
      !formData.description ||
      !formData.eventType ||
      !formData.courseEnrolled ||
      !formData.date ||
      !formData.time ||
      !formData.host ||
      !formData.eventPoster
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (formData.eventType === "Online" && !formData.eventLink) {
      toast.error("Event link is required for online events.");
      return;
    }

    toast.success("🎉 Event created successfully!");
    console.log("Event Data Submitted:", formData);

    // ✅ Reset form
    setFormData({
      eventName: "",
      description: "",
      eventType: "",
      courseEnrolled: "",
      eventLink: "",
      date: "",
      time: "",
      duration: "",
      host: "",
      eventPoster: null,
    });
    setPreview(null);

    const fileInput = document.getElementById("eventPosterInput");
    if (fileInput) fileInput.value = "";
  };

  // ✅ Course options based on Event Type
  const onlineCourses = [
    "Editing & Designing",
    "Editing",
    "Designing",
    "TAC Suite",
    "Digital Marketing",
  ];
  const offlineCourses = ["TAC Suite", "Digital Marketing"];

  const courseOptions =
    formData.eventType === "Online" ? onlineCourses : formData.eventType === "Offline" ? offlineCourses : [];

  return (
    <ClientLayout>
      <div className="container py-4 course-form">
        <Toaster position="top-right" />
        <div className="card p-4 shadow-sm border-0">
          {/* Header with breadcrumb link */}
<div className="d-flex justify-content-between align-items-center mb-4">
  <h4
    className="fw-bold mb-0"
    style={{ color: "var(--primary, #FEB614)", fontWeight: 500 }}
  >
    Add New Event
  </h4>
  <div className="text-end">
    <a
      href="/Events/View"
      className="text-decoration-none me-1"
      style={{
        color: theme === "dark" ? "#aaa" : "#555",
      }}
    >
      Events
    </a>
    <span style={{ color: theme === "dark" ? "#aaa" : "#777" }}>/</span>
    <span
      className="ms-1 fw-semibold"
      style={{
        color: "var(--primary, #FEB614)",
      }}
    >
      Add Event
    </span>
  </div>
</div>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Event Name */}
              <div className="col-md-6">
                <label className="form-label">
                  Event Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  placeholder="Enter event name"
                  className="form-control"
                  required
                />
              </div>

              {/* Host / Speaker */}
              <div className="col-md-6">
                <label className="form-label">
                  Host / Speaker <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="host"
                  value={formData.host}
                  onChange={handleChange}
                  placeholder="Enter host or speaker name"
                  className="form-control"
                  required
                />
              </div>

              {/* Description */}
              <div className="col-12">
                <label className="form-label">
                  Description <span className="text-danger">*</span>
                </label>
                <textarea
                  rows="3"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter event description"
                  className="form-control"
                  required
                ></textarea>
              </div>

              {/* Event Type */}
              <div className="col-md-4">
                <label className="form-label">
                  Event Type <span className="text-danger">*</span>
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>

              {/* Course Enrolled */}
              <div className="col-md-4">
                <label className="form-label">
                  Course Enrolled <span className="text-danger">*</span>
                </label>
                <select
                  name="courseEnrolled"
                  value={formData.courseEnrolled}
                  onChange={handleChange}
                  className="form-select"
                  disabled={!formData.eventType}
                  required
                >
                  <option value="">Select Course</option>
                  {courseOptions.map((course, i) => (
                    <option key={i} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              {/* Event Link */}
             {/* Event Link */}
<div className="col-md-4">
  <label className="form-label">
    Event Link <span className="text-danger">*</span>
  </label>
  <input
    type="url"
    name="eventLink"
    value={formData.eventLink}
    onChange={handleChange}
    placeholder="https://example.com/meet"
    className="form-control"
    disabled={formData.eventType !== "Online"}
    style={{
      backgroundColor:
        formData.eventType !== "Online"
          ? theme === "dark"
            ? "#2a2a2a"
            : "#f1f1f1"
          : "",
    }}
  />
  <small className="text-muted d-block mt-1"
    style={{
      minHeight: "18px", 
      visibility: formData.eventType !== "Online" ? "visible" : "hidden", }} >(Enabled only for Online events)
  </small>
</div>

              {/* Date */}
              <div className="col-md-4">
                <label className="form-label">
                  Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  className="form-control"
                  required
                />
              </div>

              {/* Time */}
              <div className="col-md-4">
                <label className="form-label">
                  Time <span className="text-danger">*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Duration */}
              <div className="col-md-4">
                <label className="form-label">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 2 hours"
                  className="form-control"
                />
              </div>

              {/* Event Poster */}
              <div className="col-12">
                <label className="form-label">
                  Event Poster / Banner <span className="text-danger">*</span>
                </label>
                <input
                  id="eventPosterInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="form-control"
                  required
                />
                {preview && (
                  <div className="mt-3">
                    <img
                      src={preview}
                      alt="Event Poster Preview"
                      style={{
                        width: "220px",
                        borderRadius: "10px",
                        border: "1px solid var(--border-color)",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        document.getElementById("eventPosterInput").click()
                      }
                      title="Click to change image"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button type="submit" className="btn btn-primary-theme">
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </ClientLayout>
  );
}

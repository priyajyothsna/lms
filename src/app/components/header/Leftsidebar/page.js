"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Startbar({ isOpen: initialOpen = true }) {
 const [isOpen, setIsOpen] = useState(initialOpen);
  const [openMenu, setOpenMenu] = useState(null);
  const [profilePopupOpen, setProfilePopupOpen] = useState(false);

  const profileRef = useRef(null);
  const coursesRef = useRef(null);
  const coursessRef = useRef(null);
  const settingsRef = useRef(null);
  const analyticsRef = useRef(null);

  const [dropdownHeights, setDropdownHeights] = useState({
    courses: "0px",    
    coursess: "0px",
    settings: "0px",
    analytics: "0px",
  });

  const pathname = usePathname();
  const isSubscriptionPage = pathname === "/Subscription";

  // Collapse sidebar by default on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsOpen(false); // collapsed on devices
      } else {
        setIsOpen(true); // expanded on desktop
      }
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(prev => !prev);

  const toggleMenu = (menu) => {
    if (!isOpen) setIsOpen(true);
    setOpenMenu(prev => (prev === menu ? null : menu));
  };

  useEffect(() => {
    setDropdownHeights({
      courses: openMenu === "courses" && coursesRef.current ? `${coursesRef.current.scrollHeight}px` : "0px",
      
      coursess: openMenu === "coursess" && coursessRef.current ? `${coursessRef.current.scrollHeight}px` : "0px",
      settings: openMenu === "settings" && settingsRef.current ? `${settingsRef.current.scrollHeight}px` : "0px",
      analytics: openMenu === "analytics" && analyticsRef.current ? `${analyticsRef.current.scrollHeight}px` : "0px",
    });
  }, [openMenu]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfilePopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`startbar sticky-bar ${isOpen ? "" : "collapsed"}`}>
      {/* Brand Logo */}
      <div className="brand">
        <Link href="/" className="logo">
          {isOpen ? (
            <Image src="/images/logo.png" alt="The Art Code Logo" width={70} height={30} priority />
          ) : (
            <Image src="/images/logo.png" alt="TAC Logo" width={50} height={30} priority />
          )}
        </Link>
      </div>

      {!isSubscriptionPage && (
        <div className="startbar-content">
          <div className="startbar-menu">
            <ul className="navbar-nav mb-auto w-100">
              {/* Dashboard */}
              <li className="nav-item">
                <Link href="/" className="nav-link d-flex align-items-center w-100">
                  <div className="left-content">
                    <i className="bi bi-speedometer2"></i>
                    {isOpen && <span>Tac Hub</span>}
                  </div>
                </Link>
              </li>

                            {/* Courses Dropdown */}
              <li className="nav-item">
                <button
                  className="nav-link d-flex align-items-center w-100 dropdown-toggle-btn"
                  onClick={() => toggleMenu("courses")}
                >
                  <div className="left-content">
                    <i className="bi bi-book"></i>
                    {isOpen && <span>My Courses</span>}
                  </div>
                  {isOpen && <i className={`dropdown-icon bi ${openMenu === "courses" ? "bi-chevron-up" : "bi-chevron-down"}`}></i>}
                </button>
                {isOpen && (
                  <ul
                    className="sidebar-dropdown"
                    ref={coursesRef}
                    style={{ maxHeight: dropdownHeights.courses, overflow: "hidden", transition: "max-height 0.3s ease" }}
                  >
                    <li><Link href="/Courses/View" className="nav-link">View Course</Link></li>
                    <li><Link href="/Courses/Add" className="nav-link">Add Course</Link></li>
                    <li><Link href="/courses/new" className="nav-link">Update Course</Link></li>
                  </ul>
                )}
              </li>

               <li className="nav-item">
                <Link href="/students" className="nav-link d-flex align-items-center w-100">
                  <div className="left-content">
                    <i className="bi bi-people"></i>
                    {isOpen && <span>Add-On Courses</span>}
                  </div>
                </Link>
              </li>

              {/* Assignments */}
              <li className="nav-item">
                <Link href="/assignments" className="nav-link d-flex align-items-center w-100">
                  <div className="left-content">
                    <i className="bi bi-journal-text"></i>
                    {isOpen && <span>Assignments</span>}
                  </div>
                </Link>
              </li>

              <li className="nav-item">
                <Link href="/students" className="nav-link d-flex align-items-center w-100">
                  <div className="left-content">
                    <i className="bi bi-people"></i>
                    {isOpen && <span>MY Growth Track</span>}
                  </div>
                </Link>
              </li>
              
               <li className="nav-item">
                <Link href="/students" className="nav-link d-flex align-items-center w-100">
                  <div className="left-content">
                    <i className="bi bi-people"></i>
                    {isOpen && <span>TAC Talks</span>}
                  </div>
                </Link>
              </li>

               
                            {/* Events Dropdown */}
              <li className="nav-item">
                <button
                  className="nav-link d-flex align-items-center w-100 dropdown-toggle-btn"
                  onClick={() => toggleMenu("courses")}
                >
                  <div className="left-content">
                    <i className="bi bi-people"></i>
                    {isOpen && <span>TAC Events</span>}
                  </div>
                  {isOpen && <i className={`dropdown-icon bi ${openMenu === "courses" ? "bi-chevron-up" : "bi-chevron-down"}`}></i>}
                </button>
                {isOpen && (
                  <ul
                    className="sidebar-dropdown"
                    ref={coursesRef}
                    style={{ maxHeight: dropdownHeights.courses, overflow: "hidden", transition: "max-height 0.3s ease" }}
                  >
                    <li><Link href="/Events/View" className="nav-link">View Events</Link></li>
                    <li><Link href="/Events/Add" className="nav-link">Add Events</Link></li>
                    <li><Link href="/Events/new" className="nav-link">Update Events</Link></li>
                  </ul>
                )}
              </li>

              
                 <li className="nav-item">
  <Link href="/Tackathons" className="nav-link d-flex align-items-center w-100">
    <div className="left-content">
      <i className="bi bi-people"></i>
      {isOpen && <span>Tackathons</span>}
    </div>
  </Link>
</li>

              
 <li className="nav-item">
                <Link href="/students" className="nav-link d-flex align-items-center w-100">
                  <div className="left-content">
                    <i className="bi bi-people"></i>
                    {isOpen && <span>Last Minute Prep</span>}
                  </div>
                </Link>
              </li>

              <li className="nav-item">
                <Link href="/students" className="nav-link d-flex align-items-center w-100">
                  <div className="left-content">
                    <i className="bi bi-people"></i>
                    {isOpen && <span>Job Board</span>}
                  </div>
                </Link>
              </li>

 <li className="nav-item">
                <Link href="/students" className="nav-link d-flex align-items-center w-100">
                  <div className="left-content">
                    <i className="bi bi-people"></i>
                    {isOpen && <span>Freelance Zone</span>}
                  </div>
                </Link>
              </li>

              {/* <li className="nav-item">
                <button
                  className="nav-link d-flex align-items-center w-100 dropdown-toggle-btn"
                  onClick={() => toggleMenu("coursess")}
                >
                  <div className="left-content">
                    <i className="bi bi-book"></i>
                    {isOpen && <span>Courses</span>}
                  </div>
                  {isOpen && <i className={`dropdown-icon bi ${openMenu === "coursess" ? "bi-chevron-up" : "bi-chevron-down"}`}></i>}
                </button>
                {isOpen && (
                  <ul
                    className="sidebar-dropdown"
                    ref={coursessRef}
                    style={{ maxHeight: dropdownHeights.coursess, overflow: "hidden", transition: "max-height 0.3s ease" }}
                  >
                    <li><Link href="/courses/list" className="nav-link">View Course</Link></li>
                    <li><Link href="/courses/new" className="nav-link">Add Course</Link></li>
                    <li><Link href="/courses/new" className="nav-link">Update Course</Link></li>
                  </ul>
                )}
              </li> */}

              {/* Students */}
             {/* <li className="nav-item">
                <Link href="/students" className="nav-link d-flex align-items-center w-100">
                  <div className="left-content">
                    <i className="bi bi-people"></i>
                    {isOpen && <span>Students</span>}
                  </div>
                </Link>
              </li> */}

              {/* Settings Dropdown */}
              {/* <li className="nav-item">
                <button
                  className="nav-link d-flex align-items-center w-100 dropdown-toggle-btn"
                  onClick={() => toggleMenu("settings")}
                >
                  <div className="left-content">
                    <i className="bi bi-gear"></i>
                    {isOpen && <span>Settings</span>}
                  </div>
                  {isOpen && <i className={`dropdown-icon bi ${openMenu === "settings" ? "bi-chevron-up" : "bi-chevron-down"}`}></i>}
                </button>
                {isOpen && (
                  <ul
                    className="sidebar-dropdown"
                    ref={settingsRef}
                    style={{ maxHeight: dropdownHeights.settings, overflow: "hidden", transition: "max-height 0.3s ease" }}
                  >
                    <li><Link href="/settings/profile" className="nav-link">Profile Settings</Link></li>
                    <li><Link href="/settings/notifications" className="nav-link">Notifications</Link></li>
                    <li><Link href="/settings/security" className="nav-link">Security</Link></li>
                  </ul>
                )}
              </li> */}


              {/* Analytics Dropdown */}
              {/* <li className="nav-item">
                <button
                  className="nav-link d-flex align-items-center w-100 dropdown-toggle-btn"
                  onClick={() => toggleMenu("analytics")}
                >
                  <div className="left-content">
                    <i className="bi bi-bar-chart"></i>
                    {isOpen && <span>Analytics</span>}
                  </div>
                  {isOpen && <i className={`dropdown-icon bi ${openMenu === "analytics" ? "bi-chevron-up" : "bi-chevron-down"}`}></i>}
                </button>
                {isOpen && (
                  <ul
                    className="sidebar-dropdown"
                    ref={analyticsRef}
                    style={{ maxHeight: dropdownHeights.analytics, overflow: "hidden", transition: "max-height 0.3s ease" }}
                  >
                    <li><Link href="/analytics/reports" className="nav-link">Reports</Link></li>
                    <li><Link href="/analytics/statistics" className="nav-link">Statistics</Link></li>
                  </ul>
                )}
              </li> */}
            </ul>
          </div>

          {/* Footer */}
          <div className="startbar-footer">
            <div className="footer-content">
              <div className={`footer-links ${isOpen ? "open" : "collapsed"}`}>
                <a className="footer-link" onClick={toggleSidebar}>
                  <i className={`bi ${isOpen ? "bi-chevron-left" : "bi-chevron-right"}`}></i>
                  {isOpen && <span>Collapse</span>}
                </a>

                <div className="footer-profile" ref={profileRef} style={{ position: "relative" }}>
                  <button className="footer-link" onClick={() => setProfilePopupOpen(!profilePopupOpen)}>
                    <i className="bi bi-person-circle"></i>
                    {isOpen && <span>Profile</span>}
                  </button>
                  {profilePopupOpen && (
                    <ul className="profile-dropup" style={{
                      position: "absolute",
                      bottom: "100%",
                      left: 0,
                      backgroundColor: "#fff",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                      borderRadius: "8px",
                      marginBottom: "0.5rem",
                      padding: "0.25rem 0",
                      minWidth: "160px",
                      zIndex: 1000,
                      listStyle: "none",
                    }}>
                      <li><Link href="/profile/view" style={{ display: "block", padding: "0.5rem 1rem", color: "#333", textDecoration: "none" }}>View Profile</Link></li>
                      <li><Link href="/profile/edit" style={{ display: "block", padding: "0.5rem 1rem", color: "#333", textDecoration: "none" }}>Edit Profile</Link></li>
                      <li><Link href="/profile/settings" style={{ display: "block", padding: "0.5rem 1rem", color: "#333", textDecoration: "none" }}>Settings</Link></li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

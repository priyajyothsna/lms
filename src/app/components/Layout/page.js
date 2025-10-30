"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check local storage or default to light
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <button
        onClick={toggleTheme}
        style={{
          position: "fixed",
          bottom: 10,
          right: 10,
          zIndex: 99999,
          padding: "6px 12px",
          borderRadius: "6px",
        }}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      {children}
    </ThemeContext.Provider>
  );
}

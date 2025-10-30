"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "../components/Layout/page"; // adjust path if needed

export default function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { theme } = useTheme();

  // Image changes based on theme
  const logoSrc = theme === "light" ? "/images/trim.png" : "/images/logo.png";

  // Handlers
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailOrUsername || !password) {
      alert("Please enter both email/username and password");
      return;
    }

    setLoading(true);

    // Simulate login API
    setTimeout(() => {
      setLoading(false);
      router.push("/Dashboard");
    }, 1500);
  };

  return (
    <div className="register-page-container">
      <div className="register-form-container">
        {/* ===== Left Hero Section ===== */}
        <section className="register-hero">
          <Image src={logoSrc} alt="TAC Logo" width={110} height={50} />
          <h1>
            Learn.<span className="register-accent">Create</span>.Lead.
          </h1>
          <p>
            Empowering Creative Learning{" "}
            <span className="register-handle">@TheArtCode</span>
          </p>
        </section>

        {/* ===== Right Card Section ===== */}
        <section className="register-card">
          <form onSubmit={handleSubmit} className="slide-fade">
            <h3>Login</h3>

            <label htmlFor="email">Email / Username</label>
            <div className="register-input-row">
              <input
                id="email"
                type="text"
                placeholder="Enter Email or Username"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                required
              />
            </div>

            <label htmlFor="password">Password</label>
            <div className="register-input-row">
              <input
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primaary ${
                emailOrUsername && password ? "active" : ""
              }`}
              disabled={!emailOrUsername || !password}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {loading && (
            <div className="otp-loader">
              <div className="spinner"></div>
              <p>Authenticating...</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

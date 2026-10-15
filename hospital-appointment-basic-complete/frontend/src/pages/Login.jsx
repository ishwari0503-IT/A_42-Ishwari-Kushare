import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../api";

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    setMessage("");

    try {
      const data = await request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      localStorage.setItem("hospitalUser", JSON.stringify(data.user));
      setUser(data.user);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else if (data.user.role === "doctor") {
        navigate("/appointments");
      } else {
        navigate("/");
      }
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main className="form-page">
      <div className="form-card">
        <p className="eyebrow">WELCOME BACK</p>
        <h2>Login</h2>

        {message && <div className="message">{message}</div>}

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="primary-button full">
            Login
          </button>
        </form>

        <p className="center">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>

        <div className="demo-box">
          <strong>Demo Accounts</strong>
          <br />
          Patient: patient@hospital.com / patient123
          <br />
          Doctor (Dr. Priya Sharma): doctor@hospital.com / doctor123
          <br />
          Doctor (Dr. Ananya Iyer): ananya@hospital.com / doctor123
          <br />
          Admin: admin@hospital.com / admin123
        </div>
      </div>
    </main>
  );
}

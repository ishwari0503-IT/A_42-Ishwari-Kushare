import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("hospitalUser");
    setUser(null);
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          CareBook Hospital
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>

          {user?.role === "patient" && (
            <>
              <Link to="/book">Book Appointment</Link>
              <Link to="/appointments">My Appointments</Link>
            </>
          )}

          {user?.role === "doctor" && (
            <Link to="/appointments">Appointments</Link>
          )}

          {user?.role === "admin" && (
            <Link to="/admin">Admin Dashboard</Link>
          )}

          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          {user && (
            <>
              <span className="welcome">Hi, {user.name}</span>
              <button className="nav-button" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../api";

export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("patient");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    specialization: "",
    experience: "",
    fee: ""
  });

  const [message, setMessage] = useState("");

  function update(field, value) {
    setForm((old) => ({
      ...old,
      [field]: value
    }));
  }

  async function handleRegister(event) {
    event.preventDefault();
    setMessage("");

    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        role
      };

      if (role === "doctor") {
        payload.specialization = form.specialization;
        payload.experience = form.experience ? Number(form.experience) : 0;
        payload.fee = form.fee ? Number(form.fee) : 0;
      }

      const res = await request("/auth/register", {
        method: "POST",
        body: JSON.stringify(payload)
      });

      alert(res.message || "Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      setMessage(error.message);
    }
  }

  const roleLabels = {
    patient: "Patient",
    doctor: "Doctor"
  };

  return (
    <main className="form-page">
      <div className="form-card">
        <p className="eyebrow">{roleLabels[role].toUpperCase()} REGISTRATION</p>
        <h2>Create Account</h2>

        <div className="role-selector">
          <button
            type="button"
            className={`role-tab ${role === "patient" ? "active" : ""}`}
            onClick={() => setRole("patient")}
          >
            Patient
          </button>
          <button
            type="button"
            className={`role-tab ${role === "doctor" ? "active" : ""}`}
            onClick={() => setRole("doctor")}
          >
            Doctor
          </button>
        </div>

        {message && <div className="message">{message}</div>}

        <form onSubmit={handleRegister}>
          <label>Full Name</label>
          <input
            placeholder={role === "doctor" ? "e.g. Dr. Ramesh Kumar" : "e.g. Rahul Sharma"}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="e.g. user@hospital.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
          />

          <label>Phone</label>
          <input
            placeholder="e.g. 9876543210"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Choose a password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            required
          />

          {role === "doctor" && (
            <>
              <label>Specialization</label>
              <input
                placeholder="e.g. Cardiologist, Dermatologist, General Physician"
                value={form.specialization}
                onChange={(e) => update("specialization", e.target.value)}
                required
              />

              <label>Experience (Years)</label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 5"
                value={form.experience}
                onChange={(e) => update("experience", e.target.value)}
              />

              <label>Consultation Fee (₹)</label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 500"
                value={form.fee}
                onChange={(e) => update("fee", e.target.value)}
              />
            </>
          )}

          <button className="primary-button full">
            Register as {roleLabels[role]}
          </button>
        </form>

        <p className="center">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}

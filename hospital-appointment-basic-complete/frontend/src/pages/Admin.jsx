import React, { useEffect, useState } from "react";
import { request } from "../api";

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    fee: ""
  });

  async function loadData() {
    try {
      const [statsData, doctorsData] = await Promise.all([
        request("/admin/stats"),
        request("/doctors")
      ]);

      setStats(statsData);
      setDoctors(doctorsData);
    } catch (error) {
      setMessage(error.message);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function update(field, value) {
    setForm((old) => ({
      ...old,
      [field]: value
    }));
  }

  async function addDoctor(event) {
    event.preventDefault();
    setMessage("");

    try {
      await request("/doctors", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          password: "doctor123"
        })
      });

      setMessage("Doctor added successfully.");

      setForm({
        name: "",
        email: "",
        phone: "",
        specialization: "",
        experience: "",
        fee: ""
      });

      loadData();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main className="container page">
      <p className="eyebrow">ADMIN AREA</p>
      <h2>Admin Dashboard</h2>

      {message && <div className="message">{message}</div>}

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <strong>{stats.patients}</strong>
            <span>Patients</span>
          </div>

          <div className="stat-card">
            <strong>{stats.doctors}</strong>
            <span>Doctors</span>
          </div>

          <div className="stat-card">
            <strong>{stats.appointments}</strong>
            <span>Appointments</span>
          </div>

          <div className="stat-card">
            <strong>{stats.completed}</strong>
            <span>Completed</span>
          </div>

          <div className="stat-card">
            <strong>{stats.cancelled}</strong>
            <span>Cancelled</span>
          </div>
        </div>
      )}

      <div className="admin-grid">
        <div className="form-card">
          <p className="eyebrow">MANAGE DOCTORS</p>
          <h3>Add Doctor</h3>

          <form onSubmit={addDoctor}>
            <label>Name</label>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              required
            />

            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              required
            />

            <label>Phone</label>
            <input
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />

            <label>Specialization</label>
            <input
              value={form.specialization}
              onChange={(e) =>
                update("specialization", e.target.value)
              }
              required
            />

            <label>Experience</label>
            <input
              type="number"
              value={form.experience}
              onChange={(e) =>
                update("experience", e.target.value)
              }
            />

            <label>Consultation Fee</label>
            <input
              type="number"
              value={form.fee}
              onChange={(e) => update("fee", e.target.value)}
            />

            <button className="primary-button full">
              Add Doctor
            </button>
          </form>
        </div>

        <div>
          <p className="eyebrow">DOCTOR LIST</p>
          <h3>Doctors</h3>

          {doctors.map((doctor) => (
            <div className="list-card" key={doctor._id}>
              <strong>
                Dr. {doctor.userId?.name}
              </strong>

              <p>
                {doctor.specialization} ·{" "}
                {doctor.experience} years · ₹{doctor.fee}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

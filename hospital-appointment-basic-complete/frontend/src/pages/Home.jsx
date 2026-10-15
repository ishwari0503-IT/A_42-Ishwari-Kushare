import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { request } from "../api";

export default function Home({ user }) {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    request("/doctors")
      .then(setDoctors)
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const name = doctor.userId?.name || "";
    const specialization = doctor.specialization || "";

    return `${name} ${specialization}`
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">HOSPITAL APPOINTMENT SYSTEM</p>
          <h1>Book your doctor appointment easily.</h1>
          <p>
            Find doctors, choose a convenient time and manage your
            appointments online.
          </p>

          {!user && (
            <Link to="/login" className="primary-button">
              Get Started
            </Link>
          )}

          {user?.role === "patient" && (
            <Link to="/book" className="primary-button">
              Book Appointment
            </Link>
          )}
        </div>
      </section>

      <main className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">OUR DOCTORS</p>
            <h2>Find a Doctor</h2>
          </div>

          <input
            className="search"
            type="text"
            placeholder="Search doctor or specialization"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading doctors...</p>
        ) : (
          <div className="doctor-grid">
            {filteredDoctors.map((doctor) => (
              <div className="doctor-card" key={doctor._id}>
                <div className="doctor-icon">DR</div>

                <h3>
                  {doctor.userId?.name?.startsWith("Dr.")
                    ? doctor.userId?.name
                    : `Dr. ${doctor.userId?.name}`}
                </h3>

                <p className="specialization">
                  {doctor.specialization}
                </p>

                <p>{doctor.experience} years experience</p>
                <p>Consultation Fee: ₹{doctor.fee}</p>

                {user?.role === "patient" && (
                  <Link
                    className="primary-button small"
                    to="/book"
                  >
                    Book Appointment
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && filteredDoctors.length === 0 && (
          <div className="empty">
            No doctors found. Open /api/setup-demo once to create demo data.
          </div>
        )}
      </main>
    </>
  );
}

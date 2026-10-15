import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../api";

export default function BookAppointment({ user }) {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    request("/doctors")
      .then(setDoctors)
      .catch((error) => setMessage(error.message));
  }, []);

  const selectedDoctor = doctors.find(
    (doctor) => doctor._id === doctorId
  );

  async function handleBooking(event) {
    event.preventDefault();
    setMessage("");

    try {
      await request("/appointments", {
        method: "POST",
        body: JSON.stringify({
          patientId: user.id,
          doctorId,
          date,
          time,
          reason
        })
      });

      alert("Appointment booked successfully.");
      navigate("/appointments");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main className="form-page">
      <div className="form-card wide">
        <p className="eyebrow">PATIENT AREA</p>
        <h2>Book Appointment</h2>

        {message && <div className="message">{message}</div>}

        <form onSubmit={handleBooking}>
          <label>Select Doctor</label>
          <select
            value={doctorId}
            onChange={(e) => {
              setDoctorId(e.target.value);
              setTime("");
            }}
            required
          >
            <option value="">Choose a doctor</option>

            {doctors.map((doctor) => {
              const name = doctor.userId?.name || "";
              const formattedName = name.startsWith("Dr.") ? name : `Dr. ${name}`;
              return (
                <option key={doctor._id} value={doctor._id}>
                  {formattedName} - {doctor.specialization}
                </option>
              );
            })}
          </select>

          {selectedDoctor && (
            <div className="info-box">
              <strong>Available slots:</strong>{" "}
              {selectedDoctor.availableSlots.join(", ")}
            </div>
          )}

          <label>Date</label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label>Time</label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          >
            <option value="">Choose a time</option>

            {(selectedDoctor?.availableSlots || []).map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>

          <label>Reason for Visit</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Example: General checkup"
          />

          <button className="primary-button full">
            Confirm Appointment
          </button>
        </form>
      </div>
    </main>
  );
}

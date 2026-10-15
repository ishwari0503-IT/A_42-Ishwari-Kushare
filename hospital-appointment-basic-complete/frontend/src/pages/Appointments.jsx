import React, { useEffect, useState } from "react";
import { request } from "../api";

export default function Appointments({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");

  async function loadAppointments() {
    try {
      const userId = user?.id || user?._id;
      let endpoint = "/appointments";

      if (user?.role === "patient") {
        endpoint = `/appointments/patient/${userId}`;
      }

      if (user?.role === "doctor") {
        endpoint = `/appointments/doctor/${userId}`;
      }

      const data = await request(endpoint);
      setAppointments(data);
    } catch (error) {
      setMessage(error.message);
    }
  }

  useEffect(() => {
    loadAppointments();
  }, [user?.id, user?._id, user?.role]);

  async function cancelAppointment(id) {
    if (!window.confirm("Cancel this appointment?")) return;

    try {
      await request(`/appointments/${id}/cancel`, {
        method: "PUT"
      });

      loadAppointments();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function updateStatus(id, status) {
    try {
      await request(`/appointments/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status })
      });

      loadAppointments();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main className="container page">
      <p className="eyebrow">APPOINTMENTS</p>

      <h2>
        {user.role === "patient"
          ? "My Appointments"
          : user.role === "doctor"
          ? "Patient Appointments"
          : "All Appointments"}
      </h2>

      {message && <div className="message">{message}</div>}

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Date</th>
              <th>Time</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.patientId?.name}</td>
                <td>
                  {(() => {
                    const docName = appointment.doctorId?.userId?.name || appointment.doctorId?.name || "";
                    if (!docName) return "-";
                    return docName.startsWith("Dr.") ? docName : `Dr. ${docName}`;
                  })()}
                </td>
                <td>{appointment.doctorId?.specialization}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.reason || "-"}</td>
                <td>
                  <span className={`status ${appointment.status.toLowerCase()}`}>
                    {appointment.status}
                  </span>
                </td>
                <td>
                  {user.role === "patient" &&
                    appointment.status !== "Cancelled" && (
                      <button
                        className="danger-button"
                        onClick={() =>
                          cancelAppointment(appointment._id)
                        }
                      >
                        Cancel
                      </button>
                    )}

                  {user.role === "doctor" &&
                    appointment.status === "Pending" && (
                      <button
                        className="success-button"
                        onClick={() =>
                          updateStatus(
                            appointment._id,
                            "Confirmed"
                          )
                        }
                      >
                        Confirm
                      </button>
                    )}

                  {user.role === "doctor" &&
                    appointment.status === "Confirmed" && (
                      <button
                        className="primary-button small"
                        onClick={() =>
                          updateStatus(
                            appointment._id,
                            "Completed"
                          )
                        }
                      >
                        Complete
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {appointments.length === 0 && (
        <div className="empty">
          No appointments found.
        </div>
      )}
    </main>
  );
}

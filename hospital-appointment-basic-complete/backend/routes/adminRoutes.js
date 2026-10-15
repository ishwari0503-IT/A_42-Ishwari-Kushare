const express = require("express");
const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const [patients, doctors, appointments, completed, cancelled] =
      await Promise.all([
        User.countDocuments({ role: "patient" }),
        Doctor.countDocuments(),
        Appointment.countDocuments(),
        Appointment.countDocuments({ status: "Completed" }),
        Appointment.countDocuments({ status: "Cancelled" })
      ]);

    res.json({
      patients,
      doctors,
      appointments,
      completed,
      cancelled
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const express = require("express");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Notification = require("../models/Notification");

const router = express.Router();

async function fullAppointment(id) {
  return Appointment.findById(id)
    .populate("patientId", "name email phone")
    .populate({
      path: "doctorId",
      populate: { path: "userId", select: "name email phone" }
    });
}

router.post("/", async (req, res) => {
  try {
    const { patientId, doctorId, date, time, reason } = req.body;

    if (!patientId || !doctorId || !date || !time) {
      return res.status(400).json({
        message: "Patient, doctor, date and time are required."
      });
    }

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    if (!doctor.availableSlots.includes(time)) {
      return res.status(400).json({
        message: "Please select one of the doctor's available time slots."
      });
    }

    const alreadyBooked = await Appointment.findOne({
      doctorId,
      date,
      time,
      status: { $ne: "Cancelled" }
    });

    if (alreadyBooked) {
      return res.status(400).json({
        message: "This time slot is already booked."
      });
    }

    const appointment = await Appointment.create({
      patientId,
      doctorId,
      date,
      time,
      reason: reason || ""
    });

    await Notification.create({
      userId: doctor.userId,
      message: `New appointment request for ${date} at ${time}.`
    });

    res.status(201).json({
      message: "Appointment booked successfully.",
      appointment: await fullAppointment(appointment._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId", "name email phone")
      .populate({
        path: "doctorId",
        populate: { path: "userId", select: "name email phone" }
      })
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/patient/:patientId", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.params.patientId
    })
      .populate({
        path: "doctorId",
        populate: { path: "userId", select: "name email phone" }
      })
      .sort({ date: 1, time: 1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/doctor/:doctorId", async (req, res) => {
  try {
    const id = req.params.doctorId;
    let doctor = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      doctor = await Doctor.findOne({ userId: id }) || await Doctor.findById(id);
    }

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found." });
    }

    const appointments = await Appointment.find({ doctorId: doctor._id })
      .populate("patientId", "name email phone")
      .populate({
        path: "doctorId",
        populate: { path: "userId", select: "name email phone" }
      })
      .sort({ date: 1, time: 1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id/cancel", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    appointment.status = "Cancelled";
    await appointment.save();

    await Notification.create({
      userId: appointment.patientId,
      message: `Your appointment on ${appointment.date} at ${appointment.time} was cancelled.`
    });

    res.json({
      message: "Appointment cancelled.",
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id/status", async (req, res) => {
  try {
    const allowed = ["Pending", "Confirmed", "Completed", "Cancelled"];
    const { status } = req.body;

    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid appointment status." });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    appointment.status = status;
    await appointment.save();

    await Notification.create({
      userId: appointment.patientId,
      message: `Your appointment on ${appointment.date} at ${appointment.time} is now ${status}.`
    });

    res.json({
      message: "Appointment status updated.",
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

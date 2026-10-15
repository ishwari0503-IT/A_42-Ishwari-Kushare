const express = require("express");
const User = require("../models/User");
const Doctor = require("../models/Doctor");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      specialization,
      experience,
      fee
    } = req.body;

    if (!name || !email || !specialization) {
      return res.status(400).json({
        message: "Name, email and specialization are required."
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const exists = await User.findOne({ email: cleanEmail });

    if (exists) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const doctorUser = await User.create({
      name,
      email: cleanEmail,
      password: password || "doctor123",
      phone: phone || "",
      role: "doctor"
    });

    const doctor = await Doctor.create({
      userId: doctorUser._id,
      specialization,
      experience: Number(experience) || 0,
      fee: Number(fee) || 0
    });

    const result = await doctor.populate("userId", "name email phone");

    res.status(201).json({
      message: "Doctor added successfully.",
      doctor: result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

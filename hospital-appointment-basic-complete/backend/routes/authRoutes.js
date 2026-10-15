const express = require("express");
const User = require("../models/User");
const Doctor = require("../models/Doctor");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      role = "patient",
      specialization,
      experience,
      fee
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required."
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const exists = await User.findOne({ email: cleanEmail });

    if (exists) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    const allowedRoles = ["patient", "doctor"];
    const targetRole = allowedRoles.includes(role) ? role : "patient";

    if (targetRole === "doctor" && !specialization) {
      return res.status(400).json({
        message: "Specialization is required for doctor registration."
      });
    }

    const user = await User.create({
      name,
      email: cleanEmail,
      password,
      phone: phone || "",
      role: targetRole
    });

    if (targetRole === "doctor") {
      await Doctor.create({
        userId: user._id,
        specialization,
        experience: Number(experience) || 0,
        fee: Number(fee) || 0,
        availableSlots: [
          "10:00 AM",
          "10:30 AM",
          "11:00 AM",
          "11:30 AM",
          "4:00 PM",
          "4:30 PM"
        ]
      });
    }

    res.status(201).json({
      message: `${targetRole.charAt(0).toUpperCase() + targetRole.slice(1)} registration successful.`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
      password
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    res.json({
      message: "Login successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

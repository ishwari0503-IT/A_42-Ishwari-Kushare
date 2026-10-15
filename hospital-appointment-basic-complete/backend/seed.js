require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Doctor = require("./models/Doctor");

const uri = process.env.MONGODB_URI;

async function seed() {
  await mongoose.connect(uri);

  const accounts = [
    {
      name: "Demo Patient",
      email: "patient@hospital.com",
      password: "patient123",
      phone: "9123456780",
      role: "patient"
    },
    {
      name: "Dr. Priya Sharma",
      email: "doctor@hospital.com",
      password: "doctor123",
      phone: "9876543210",
      role: "doctor"
    },
    {
      name: "Hospital Admin",
      email: "admin@hospital.com",
      password: "admin123",
      role: "admin"
    }
  ];

  for (const account of accounts) {
    await User.updateOne(
      { email: account.email },
      { $set: account },
      { upsert: true }
    );
  }

  const doctorUser = await User.findOne({ email: "doctor@hospital.com" });

  await Doctor.updateOne(
    { userId: doctorUser._id },
    {
      $setOnInsert: {
        userId: doctorUser._id,
        specialization: "Cardiologist",
        experience: 8,
        fee: 500,
        availableSlots: [
          "10:00 AM",
          "10:30 AM",
          "11:00 AM",
          "11:30 AM",
          "4:00 PM",
          "4:30 PM"
        ]
      }
    },
    { upsert: true }
  );

  console.log("Demo data created.");
  console.log("Patient: patient@hospital.com / patient123");
  console.log("Doctor: doctor@hospital.com / doctor123");
  console.log("Admin: admin@hospital.com / admin123");

  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

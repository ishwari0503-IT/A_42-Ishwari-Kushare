const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    specialization: { type: String, required: true },
    experience: { type: Number, default: 0 },
    fee: { type: Number, default: 0 },
    availableSlots: {
      type: [String],
      default: ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "4:00 PM", "4:30 PM"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);

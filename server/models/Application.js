const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      enum: ["Georgia", "Singapore", "Russia", "Malta", "UK", "USA", "Canada", "Australia", "Germany", "France", "Ireland", "New Zealand"],
    },
    education: {
      type: String,
      required: true,
      enum: ["High School", "Bachelor's Degree", "Master's Degree", "PhD", "Diploma", "Other"],
    },
    englishTest: {
      type: String,
      required: true,
      enum: ["IELTS", "TOEFL", "Duolingo", "PTE", "Cambridge", "Not Yet Taken"],
    },
    course: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "reviewing", "approved", "rejected"],
      default: "pending",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

applicationSchema.index({ userId: 1, createdAt: -1 });
applicationSchema.index({ status: 1 });

module.exports = mongoose.model("Application", applicationSchema);

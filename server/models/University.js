const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      enum: ["Georgia", "Singapore", "Russia", "Malta", "UK", "USA", "Canada", "Australia", "Germany", "France", "Ireland", "New Zealand"],
    },
    city: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    fees: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
      currency: { type: String, default: "USD" },
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    programs: [String],
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

universitySchema.index({ location: "2dsphere" });
universitySchema.index({ country: 1, rating: -1 });

module.exports = mongoose.model("University", universitySchema);

const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { protect, authorize } = require("../middleware/auth");
const Application = require("../models/Application");

router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("phone").trim().notEmpty().withMessage("Phone is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("education").notEmpty().withMessage("Education level is required"),
    body("englishTest").notEmpty().withMessage("English test is required"),
    body("course").notEmpty().withMessage("Course interest is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
      }

      const application = await Application.create({
        userId: req.user ? req.user._id : undefined,
        ...req.body,
      });

      res.status(201).json(application);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get("/", protect, async (req, res) => {
  try {
    const { status, country, page = 1, limit = 10 } = req.query;
    const query = {};

    if (req.user.role !== "admin") {
      query.userId = req.user._id;
    }
    if (status) query.status = status;
    if (country) query.country = country;

    const total = await Application.countDocuments(query);
    const applications = await Application.find(query)
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      applications,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", protect, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate("userId", "name email phone");
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    if (req.user.role !== "admin" && application.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const { status, notes } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    );
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

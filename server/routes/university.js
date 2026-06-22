const express = require("express");
const router = express.Router();
const University = require("../models/University");

router.get("/", async (req, res) => {
  try {
    const { country, minRating, maxFees, program, page = 1, limit = 20 } = req.query;
    const query = {};

    if (country) query.country = country;
    if (minRating) query.rating = { $gte: parseFloat(minRating) };
    if (maxFees) query["fees.max"] = { $lte: parseInt(maxFees) };
    if (program) query.programs = { $in: [program] };

    const total = await University.countDocuments(query);
    const universities = await University.find(query)
      .sort({ rating: -1, featured: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ universities, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/map", async (req, res) => {
  try {
    const { country } = req.query;
    const query = country ? { country } : {};
    const universities = await University.find(query).select("name country city location fees rating featured");
    res.json(universities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }
    res.json(university);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

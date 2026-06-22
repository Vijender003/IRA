const express = require("express");
const router = express.Router();
const University = require("../models/University");

const countries = [
  {
    name: "Georgia",
    tagline: "Affordable, Safe & Student-Friendly",
    description: "Georgia offers world-class education at incredibly affordable rates with a safe environment and English-taught programs.",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
    highlights: ["Affordable Tuition", "Safe Environment", "English Programs", "Easy Visa"],
    avgCost: "$3,000 - $8,000/year",
    costOfLiving: "$400 - $700/month",
  },
  {
    name: "Singapore",
    tagline: "Modern, Innovative & Industry-Ready",
    description: "Asia's education hub with world-ranked universities and global corporations offering unmatched industry exposure.",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    highlights: ["Global Hub", "Innovation", "Career Growth", "Multicultural"],
    avgCost: "$15,000 - $35,000/year",
    costOfLiving: "$1,200 - $2,000/month",
  },
  {
    name: "Russia",
    tagline: "Culture Meets Innovation",
    description: "Rich cultural heritage combined with cutting-edge research and affordable medical programs recognized worldwide.",
    image: "https://images.unsplash.com/photo-1513326738677-b964603810d3?w=800&q=80",
    highlights: ["Rich Culture", "Research", "Medical Programs", "Affordable"],
    avgCost: "$2,000 - $7,000/year",
    costOfLiving: "$500 - $900/month",
  },
  {
    name: "Malta",
    tagline: "English-Speaking EU Gateway",
    description: "The only English-speaking EU country offering quality education with European opportunities and Mediterranean lifestyle.",
    image: "https://images.unsplash.com/photo-1584448062887-1424c8b10643?w=800&q=80",
    highlights: ["English-Speaking", "EU Access", "Mediterranean", "Work Rights"],
    avgCost: "$8,000 - $18,000/year",
    costOfLiving: "$800 - $1,400/month",
  },
  {
    name: "UK",
    tagline: "World-Class Education & Global Recognition",
    description: "Home to Oxford, Cambridge, and hundreds of world-ranked universities with rich academic traditions.",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
    highlights: ["Prestigious", "Research", "Global Network", "Post-Study Work"],
    avgCost: "$15,000 - $40,000/year",
    costOfLiving: "$1,200 - $2,500/month",
  },
  {
    name: "USA",
    tagline: "Innovation Capital of the World",
    description: "Leading global destination for higher education with cutting-edge research and diverse opportunities.",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f04?w=800&q=80",
    highlights: ["Top Ranked", "Innovation", "Diversity", "Career Opportunities"],
    avgCost: "$20,000 - $60,000/year",
    costOfLiving: "$1,500 - $3,000/month",
  },
];

router.get("/", async (req, res) => {
  try {
    const enriched = await Promise.all(
      countries.map(async (country) => {
        const uniCount = await University.countDocuments({ country: country.name });
        return { ...country, universityCount: uniCount };
      })
    );
    res.json(enriched);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:name", async (req, res) => {
  try {
    const country = countries.find(
      (c) => c.name.toLowerCase() === req.params.name.toLowerCase()
    );
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }
    const universities = await University.find({ country: country.name }).sort({ rating: -1 });
    res.json({ ...country, universities });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

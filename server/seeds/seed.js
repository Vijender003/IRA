require("dotenv").config();
const mongoose = require("mongoose");
const University = require("../models/University");

const universities = [
  // Georgia
  { name: "Tbilisi State University", country: "Georgia", city: "Tbilisi", location: { type: "Point", coordinates: [41.7151, 44.8271] }, fees: { min: 3000, max: 8000 }, rating: 4.3, programs: ["Medicine", "Computer Science", "Business", "Engineering"], description: "Georgia's oldest and most prestigious university, founded in 1918.", featured: true },
  { name: "Caucasus University", country: "Georgia", city: "Tbilisi", location: { type: "Point", coordinates: [41.7250, 44.7900] }, fees: { min: 4000, max: 10000 }, rating: 4.1, programs: ["Business", "Law", "Medicine", "Architecture"], description: "Leading private university with international partnerships." },
  { name: "Georgian Technical University", country: "Georgia", city: "Tbilisi", location: { type: "Point", coordinates: [41.7200, 44.7800] }, fees: { min: 2500, max: 6000 }, rating: 4.0, programs: ["Engineering", "IT", "Architecture", "Transport"], description: "Top technical university in the Caucasus region." },
  { name: "Ilia State University", country: "Georgia", city: "Tbilisi", location: { type: "Point", coordinates: [41.7300, 44.7700] }, fees: { min: 2000, max: 5000 }, rating: 3.9, programs: ["Computer Science", "Business", "Law", "Social Sciences"], description: "Modern university with strong research focus." },

  // Singapore
  { name: "National University of Singapore", country: "Singapore", city: "Singapore", location: { type: "Point", coordinates: [1.2966, 103.7764] }, fees: { min: 20000, max: 40000 }, rating: 4.8, programs: ["Computer Science", "Business", "Engineering", "Medicine"], description: "Asia's top university and one of the world's best.", featured: true },
  { name: "Nanyang Technological University", country: "Singapore", city: "Singapore", location: { type: "Point", coordinates: [1.3483, 103.6831] }, fees: { min: 18000, max: 35000 }, rating: 4.7, programs: ["Engineering", "Business", "Computer Science", "Art & Design"], description: "Leading research university known for engineering excellence." },
  { name: "Singapore Management University", country: "Singapore", city: "Singapore", location: { type: "Point", coordinates: [1.2995, 103.8495] }, fees: { min: 15000, max: 30000 }, rating: 4.5, programs: ["Business", "Accounting", "Economics", "Law"], description: "Premier institution for business and management education." },

  // Russia
  { name: "Moscow State University", country: "Russia", city: "Moscow", location: { type: "Point", coordinates: [55.7033, 37.5304] }, fees: { min: 4000, max: 10000 }, rating: 4.5, programs: ["Medicine", "Physics", "Mathematics", "Literature"], description: "Russia's most prestigious university, founded in 1755.", featured: true },
  { name: "Saint Petersburg State University", country: "Russia", city: "Saint Petersburg", location: { type: "Point", coordinates: [59.9410, 30.2990] }, fees: { min: 3500, max: 8000 }, rating: 4.3, programs: ["Medicine", "Law", "Business", "Arts"], description: "Second-oldest university in Russia with rich traditions." },
  { name: "Bauman Moscow State Technical University", country: "Russia", city: "Moscow", location: { type: "Point", coordinates: [55.7650, 37.6850] }, fees: { min: 3000, max: 7000 }, rating: 4.2, programs: ["Engineering", "IT", "Robotics", "Aerospace"], description: "Russia's leading technical university for engineering." },

  // Malta
  { name: "University of Malta", country: "Malta", city: "Msida", location: { type: "Point", coordinates: [35.9030, 14.4850] }, fees: { min: 8000, max: 18000 }, rating: 4.2, programs: ["Medicine", "Law", "Business", "Engineering"], description: "Malta's oldest and largest university, founded in 1592.", featured: true },
  { name: "MCAST", country: "Malta", city: "Paola", location: { type: "Point", coordinates: [35.8700, 14.5050] }, fees: { min: 6000, max: 12000 }, rating: 4.0, programs: ["Vocational Training", "IT", "Business", "Creative Arts"], description: "Malta College of Arts, Science and Technology." },

  // UK
  { name: "University of Oxford", country: "UK", city: "Oxford", location: { type: "Point", coordinates: [51.7520, -1.2577] }, fees: { min: 25000, max: 45000 }, rating: 4.9, programs: ["Medicine", "Law", "Business", "Humanities"], description: "World's oldest English-speaking university.", featured: true },
  { name: "University of Cambridge", country: "UK", city: "Cambridge", location: { type: "Point", coordinates: [52.2043, 0.1218] }, fees: { min: 24000, max: 42000 }, rating: 4.9, programs: ["Medicine", "Engineering", "Natural Sciences", "Mathematics"], description: "One of the world's top research universities.", featured: true },
  { name: "Imperial College London", country: "UK", city: "London", location: { type: "Point", coordinates: [51.4988, -0.1749] }, fees: { min: 28000, max: 48000 }, rating: 4.7, programs: ["Engineering", "Medicine", "Business", "Computer Science"], description: "World-class science, engineering, and medicine." },

  // USA
  { name: "MIT", country: "USA", city: "Cambridge", location: { type: "Point", coordinates: [42.3601, -71.0942] }, fees: { min: 40000, max: 60000 }, rating: 4.9, programs: ["Engineering", "Computer Science", "Physics", "Business"], description: "World leader in science and technology education.", featured: true },
  { name: "Stanford University", country: "USA", city: "Stanford", location: { type: "Point", coordinates: [37.4275, -122.1697] }, fees: { min: 38000, max: 58000 }, rating: 4.9, programs: ["Computer Science", "Business", "Engineering", "Law"], description: "Heart of Silicon Valley innovation." },
  { name: "Harvard University", country: "USA", city: "Cambridge", location: { type: "Point", coordinates: [42.3770, -71.1167] }, fees: { min: 42000, max: 62000 }, rating: 4.9, programs: ["Business", "Law", "Medicine", "Humanities"], description: "America's oldest and most prestigious university." },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await University.deleteMany({});
    console.log("Cleared existing universities");

    await University.insertMany(universities);
    console.log(`Seeded ${universities.length} universities`);

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedDB();

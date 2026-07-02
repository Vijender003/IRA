const servicesData = [
  {
    id: "study-abroad",
    title: "Study Abroad",
    shortDesc: "Complete guidance from university selection to relocation.",
    description:
      "We provide end-to-end support for students aspiring to study abroad. From choosing the right university and course to visa application and pre-departure orientation, our expert counselors ensure a smooth journey to your dream destination.",
    icon: "study",
    color: "from-primary-500 to-primary-600",
    glow: "shadow-primary-500/20",
    features: [
      "University Selection",
      "Application Process",
      "Visa Support",
      "Relocation Help",
      "Scholarship Guidance",
      "Pre-Departure Orientation",
    ],
    steps: [
      { title: "Free Consultation", description: "Understand your goals, preferences, and budget to find the best fit." },
      { title: "University Shortlisting", description: "We shortlist universities based on your profile, course preference, and budget." },
      { title: "Application & Documentation", description: "Our team handles applications, SOPs, LORs, and all paperwork." },
      { title: "Offer & Acceptance", description: "We guide you through offer evaluation and acceptance procedures." },
      { title: "Visa Application", description: "Complete visa filing, interview preparation, and documentation support." },
      { title: "Pre-Departure & Relocation", description: "Travel planning, accommodation, and orientation for your new journey." },
    ],
    benefits: [
      "Expert counselors with 10+ years of experience",
      "97% admit rate to top universities",
      "Scholarship assistance up to 100% tuition",
      "End-to-end visa support with 98% success rate",
    ],
  },
  {
    id: "immigration",
    title: "Immigration & Residency",
    shortDesc: "Permanent residency and relocation solutions.",
    description:
      "Our immigration experts guide you through every step of the residency and citizenship process. Whether you're seeking permanent residency, family migration, or long-term relocation, we provide tailored solutions for your global mobility goals.",
    icon: "immigration",
    color: "from-coral to-coral-dark",
    glow: "shadow-coral/20",
    features: [
      "Permanent Residency",
      "Long-term Relocation",
      "Family Migration",
      "Settlement Support",
      "Citizenship Pathways",
      "Legal Compliance",
    ],
    steps: [
      { title: "Eligibility Assessment", description: "Evaluate your profile against immigration pathways and point systems." },
      { title: "Documentation & Filing", description: "Complete document preparation, translations, and application filing." },
      { title: "Application Processing", description: "Track and manage your application through every stage." },
      { title: "Interview Preparation", description: "Mock interviews and guidance for immigration interviews." },
      { title: "Approval & Landing", description: "Post-approval support including landing arrangements and settlement." },
    ],
    benefits: [
      "98% visa success rate across all programs",
      "Expert guidance for all major immigration pathways",
      "Personalized case management",
      "Post-landing settlement support",
    ],
  },
  {
    id: "visa-services",
    title: "Visa Services",
    shortDesc: "Expert visa assistance for all major destinations.",
    description:
      "Our visa experts provide comprehensive support for all visa categories. From tourist visas to work permits, we handle the entire application process, ensuring accurate documentation and high approval rates for your travel goals.",
    icon: "visa",
    color: "from-violet-500 to-violet-600",
    glow: "shadow-violet-500/20",
    features: [
      "Student Visa",
      "Tourist Visa",
      "Work Visa",
      "Business Visa",
      "Family Visa",
      "Transit Visa",
    ],
    steps: [
      { title: "Visa Consultation", description: "Identify the right visa category based on your travel purpose." },
      { title: "Document Preparation", description: "Assistance with all required documents, forms, and supporting letters." },
      { title: "Application Submission", description: "Complete application filing with the respective embassy or consulate." },
      { title: "Interview Coaching", description: "One-on-one interview preparation with visa experts." },
      { title: "Visa Collection", description: "Track and collect your visa with post-approval guidance." },
    ],
    benefits: [
      "98% visa approval rate",
      "Expert guidance for 30+ countries",
      "Fast-track processing available",
      "End-to-end application management",
    ],
  },
  {
    id: "business",
    title: "Business & Investment",
    shortDesc: "Launch your business globally with expert guidance.",
    description:
      "We help entrepreneurs and investors establish and grow their businesses abroad. From company registration and legal compliance to investment migration and expansion strategies, our experts provide comprehensive business solutions.",
    icon: "business",
    color: "from-amber-500 to-amber-600",
    glow: "shadow-amber-500/20",
    features: [
      "Business Setup Abroad",
      "Investment Migration",
      "Expansion Strategies",
      "Legal Compliance",
      "Market Research",
      "Tax Advisory",
    ],
    steps: [
      { title: "Business Consultation", description: "Understand your business goals and identify the best jurisdiction." },
      { title: "Market Research", description: "In-depth market analysis and feasibility assessment." },
      { title: "Company Registration", description: "Complete company incorporation and regulatory compliance." },
      { title: "Legal & Tax Setup", description: "Legal structuring, tax registration, and compliance setup." },
      { title: "Launch & Growth", description: "Post-launch support including hiring, banking, and expansion." },
    ],
    benefits: [
      "Presence in 15+ countries",
      "End-to-end business setup support",
      "Expert legal and tax advisory",
      "Post-establishment growth support",
    ],
  },
];

export const whyChooseReasons = [
  { title: "98% Success Rate", description: "Industry-leading visa approval rates across all services.", icon: "shield" },
  { title: "Expert Counselors", description: "10+ years of experience in global education and immigration.", icon: "expert" },
  { title: "End-to-End Support", description: "Complete assistance from consultation to post-arrival.", icon: "support" },
  { title: "Global Partnerships", description: "500+ university and corporate partnerships worldwide.", icon: "partners" },
];

export const processSteps = [
  { number: 1, title: "Choose Service", description: "Select the service that matches your global goals." },
  { number: 2, title: "Get Consultation", description: "Free expert consultation to plan your journey." },
  { number: 3, title: "Submit Application", description: "We handle all paperwork and submissions." },
  { number: 4, title: "Visa Approval", description: "Get your visa and start your global journey." },
];

export const stats = [
  { value: 98, suffix: "%", label: "Visa Success Rate" },
  { value: 500, suffix: "+", label: "Partner Universities" },
  { value: 10000, suffix: "+", label: "Students Placed" },
];

export default servicesData;

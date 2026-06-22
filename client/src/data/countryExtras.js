const countryExtras = {
  georgia: {
    visaProcess: [
      { step: 1, title: "Apply to University", description: "Submit your application to a recognized Georgian university and receive an acceptance letter." },
      { step: 2, title: "Prepare Documents", description: "Gather passport, acceptance letter, proof of funds, health insurance, and passport photos." },
      { step: 3, title: "Submit Visa Application", description: "Apply at the Georgian embassy or consulate in your home country." },
      { step: 4, title: "Receive Student Visa", description: "Visa processing takes 2-4 weeks. You'll receive a D3 student visa." },
      { step: 5, title: "Travel & Register", description: "Arrive in Georgia and register with the Public Service Hall within 30 days." },
    ],
    prChances: { rating: "Moderate", description: "After 6+ years of legal residency, you can apply for permanent residency. Georgia offers a relatively straightforward PR process for long-term residents and investors.", pathway: "6+ years residency → PR → Citizenship (10+ years)" },
    jobMarket: { topIndustries: ["Tourism", "IT & Outsourcing", "Logistics", "Education"], avgSalary: "$500-1,500/month", demandRoles: ["Software Developer", "English Teacher", "Tourism Manager", "Business Analyst"] },
  },
  singapore: {
    visaProcess: [
      { step: 1, title: "Apply to Institution", description: "Secure admission to a recognized educational institution in Singapore." },
      { step: 2, title: "Apply for Student Pass", description: "Your institution will apply for your Student Pass on your behalf via SOLAR+ system." },
      { step: 3, title: "Receive IPA Letter", description: "Get the In-Principle Approval (IPA) letter, which allows you to enter Singapore." },
      { step: 4, title: "Travel & Complete Formalities", description: "Travel to Singapore and complete biometrics at the Immigration & Checkpoints Authority." },
      { step: 5, title: "Collect Student Pass", description: "Receive your physical Student Pass, valid for the duration of your program." },
    ],
    prChances: { rating: "High", description: "Singapore offers clear PR pathways for graduates. After working 1-3 years on an Employment Pass, you can apply for Permanent Residency.", pathway: "Student Pass → Employment Pass (1-3 yrs) → PR → Citizenship" },
    jobMarket: { topIndustries: ["Finance", "Technology", "Biomedical Sciences", "Logistics"], avgSalary: "$3,000-6,000/month", demandRoles: ["Software Engineer", "Financial Analyst", "Data Scientist", "Digital Marketing Manager"] },
  },
  russia: {
    visaProcess: [
      { step: 1, title: "Get Invitation Letter", description: "The university applies for an official visa invitation from the Russian Ministry of Foreign Affairs." },
      { step: 2, title: "Apply for Student Visa", description: "Submit your passport, invitation letter, and documents to the Russian embassy." },
      { step: 3, title: "Receive Visa", description: "Get a single-entry student visa valid for 90 days." },
      { step: 4, title: "Travel & Register", description: "Arrive in Russia and register with migration authorities within 7 days." },
      { step: 5, title: "Extend Visa", description: "Get a multi-entry visa extended for the full duration of your studies (up to 1 year)." },
    ],
    prChances: { rating: "Low-Moderate", description: "Russia offers a simplified PR process for graduates of Russian universities who have worked in the country for 1+ year after graduation.", pathway: "Student Visa → Work Permit (1+ yr) → Temporary Residency → PR (5+ yrs)" },
    jobMarket: { topIndustries: ["Oil & Gas", "IT", "Healthcare", "Engineering"], avgSalary: "$500-2,000/month", demandRoles: ["Medical Doctor", "Software Developer", "Petroleum Engineer", "Research Scientist"] },
  },
  malta: {
    visaProcess: [
      { step: 1, title: "Apply to Institution", description: "Secure admission to a recognized Maltese educational institution." },
      { step: 2, title: "Submit Visa Application", description: "Apply for a single-student visa at the Maltese embassy with your acceptance letter." },
      { step: 3, title: "Provide Biometrics", description: "Submit biometric data as part of the visa application process." },
      { step: 4, title: "Receive Decision", description: "Visa processing typically takes 4-8 weeks." },
      { step: 5, title: "Travel & Register", description: "Upon arrival, register with the local authorities and obtain your residence permit." },
    ],
    prChances: { rating: "High", description: "As an EU member, Malta offers clear pathways to permanent residency. After 5 years of continuous legal residency, you can apply for long-term residence.", pathway: "Student Visa → Work Permit → Long-Term Residence (5 yrs) → Citizenship (12+ yrs)" },
    jobMarket: { topIndustries: ["iGaming", "Financial Services", "Tourism", "Pharmaceuticals"], avgSalary: "$1,500-3,000/month", demandRoles: ["Customer Support Lead", "Software Developer", "Compliance Officer", "Accountant"] },
  },
  uk: {
    visaProcess: [
      { step: 1, title: "Apply to University", description: "Receive a Confirmation of Acceptance for Studies (CAS) from a licensed UK university." },
      { step: 2, title: "Prepare Documents", description: "Gather CAS letter, passport, financial evidence, English test results, and TB test certificate." },
      { step: 3, title: "Submit Online Application", description: "Complete the online Student Visa application and pay the visa fee and Immigration Health Surcharge." },
      { step: 4, title: "Attend Biometrics Appointment", description: "Visit a visa application center to submit biometrics and supporting documents." },
      { step: 5, title: "Receive Decision & Travel", description: "Get a decision within 3-4 weeks. The Graduate Route allows 2 years of post-study work." },
    ],
    prChances: { rating: "Moderate-High", description: "After completing your studies, the Graduate Route gives you 2 years to find work. After 5 continuous years of work, you can apply for Indefinite Leave to Remain (ILR).", pathway: "Student Visa → Graduate Route (2 yrs) → Skilled Worker Visa (5 yrs) → ILR → Citizenship" },
    jobMarket: { topIndustries: ["Finance", "Technology", "Healthcare", "Creative Arts"], avgSalary: "$2,500-5,000/month", demandRoles: ["Software Engineer", "Investment Analyst", "Data Scientist", "Registered Nurse"] },
  },
  usa: {
    visaProcess: [
      { step: 1, title: "Get Accepted by SEVP School", description: "Receive acceptance from a US university certified by the Student and Exchange Visitor Program (SEVP)." },
      { step: 2, title: "Receive I-20 Form", description: "Your university issues the I-20 form, which you need for the visa application." },
      { step: 3, title: "Pay SEVIS Fee", description: "Pay the I-901 SEVIS fee and schedule your visa interview." },
      { step: 4, title: "Attend Visa Interview", description: "Attend the F-1 visa interview at the US embassy with all required documents." },
      { step: 5, title: "Receive Visa & Travel", description: "Get your F-1 visa. You can enter the US up to 30 days before your program starts." },
    ],
    prChances: { rating: "Moderate", description: "After graduation, OPT allows 12-36 months of work. Your employer can sponsor you for an H-1B visa. The H-1B is a lottery-based system. From H-1B, you can pursue employer-sponsored green card.", pathway: "F-1 Visa → OPT (12-36 months) → H-1B Visa → Employer-Sponsored Green Card → Citizenship" },
    jobMarket: { topIndustries: ["Technology", "Finance", "Healthcare", "Consulting"], avgSalary: "$4,000-10,000/month", demandRoles: ["Software Engineer", "Data Scientist", "Management Consultant", "Medical Researcher"] },
  },
  canada: {
    visaProcess: [
      { step: 1, title: "Get Admission", description: "Receive an acceptance letter from a Designated Learning Institution (DLI) in Canada." },
      { step: 2, title: "Apply for Study Permit", description: "Submit your study permit application online with proof of acceptance, funds, and clean record." },
      { step: 3, title: "Provide Biometrics", description: "Visit a Visa Application Centre (VAC) to provide biometrics within 30 days of applying." },
      { step: 4, title: "Receive Approval", description: "Processing takes 4-12 weeks. You'll receive a Port of Entry (POE) letter upon approval." },
      { step: 5, title: "Arrive & Get Permit", description: "Show your POE letter to immigration upon arrival and receive your official Study Permit." },
    ],
    prChances: { rating: "Very High", description: "Canada has the most immigration-friendly policies. After graduating, you can get a PGWP (up to 3 years). Canadian work experience through Express Entry or PNP makes PR highly achievable.", pathway: "Study Permit → PGWP (up to 3 yrs) → Express Entry/PNP → PR (6-18 months) → Citizenship" },
    jobMarket: { topIndustries: ["Technology", "Healthcare", "Natural Resources", "Education"], avgSalary: "$3,000-6,000/month", demandRoles: ["Full Stack Developer", "Registered Nurse", "Data Analyst", "Project Manager"] },
  },
  australia: {
    visaProcess: [
      { step: 1, title: "Apply to University", description: "Receive a Confirmation of Enrollment (CoE) from an Australian university." },
      { step: 2, title: "Submit Visa Application", description: "Apply for a Student Visa (Subclass 500) online through the ImmiAccount portal." },
      { step: 3, title: "Provide Documents", description: "Submit CoE, passport, health insurance (OSHC), financial proof, and English test results." },
      { step: 4, title: "Health & Biometrics", description: "Complete a health examination and provide biometrics." },
      { step: 5, title: "Receive Visa", description: "Processing takes 4-8 weeks. The visa allows part-time work during studies." },
    ],
    prChances: { rating: "High", description: "Australia offers a post-study work visa (TGV) for 2-4 years after graduation. Skilled migration pathways like the General Skilled Migration (GSM) program provide clear PR routes.", pathway: "Student Visa → Temporary Graduate Visa (2-4 yrs) → Skilled Migration Visa (189/190) → PR → Citizenship" },
    jobMarket: { topIndustries: ["Healthcare", "Mining & Resources", "Technology", "Education"], avgSalary: "$3,500-7,000/month", demandRoles: ["Software Developer", "Registered Nurse", "Civil Engineer", "Mining Engineer"] },
  },
  germany: {
    visaProcess: [
      { step: 1, title: "Get Admission", description: "Receive an acceptance letter from a recognized German university." },
      { step: 2, title: "Open Blocked Account", description: "Open a German blocked bank account with at least €11,208 as proof of financial resources." },
      { step: 3, title: "Apply for Student Visa", description: "Submit your application at the German embassy with all documents including proof of health insurance." },
      { step: 4, title: "Receive Visa", description: "Processing takes 4-12 weeks. You'll receive a student visa valid for 3-6 months." },
      { step: 5, title: "Register & Get Residence Permit", description: "Register at the local Foreigners' Office and get a residence permit for the duration of your studies." },
    ],
    prChances: { rating: "High", description: "After graduating, you get an 18-month job-seeker visa. After 2 years of work, you can apply for a Settlement Permit (PR). EU Blue Card holders can apply for PR after 33 months (or 21 months with German B1).", pathway: "Student Visa → Job-Seeker Visa (18 months) → EU Blue Card/Work Visa → Settlement Permit (PR) (21-33 months) → Citizenship" },
    jobMarket: { topIndustries: ["Automotive", "Engineering", "IT", "Healthcare"], avgSalary: "$3,000-6,000/month", demandRoles: ["Mechanical Engineer", "Software Developer", "Data Scientist", "Research Scientist"] },
  },
  france: {
    visaProcess: [
      { step: 1, title: "Apply via Études en France", description: "Create an account and submit your application through the Campus France Études en France portal." },
      { step: 2, title: "Receive Admission", description: "Get accepted by a French institution and receive your acceptance documents." },
      { step: 3, title: "Apply for Visa", description: "Submit your long-stay student visa (VLS-TS) application at the French embassy." },
      { step: 4, title: "Attend Interview", description: "Attend a visa interview if required by your nationality." },
      { step: 5, title: "Travel & Validate", description: "Arrive in France and validate your VLS-TS visa with the French Office of Immigration (OFII) within 3 months." },
    ],
    prChances: { rating: "Moderate", description: "After graduation, you can apply for a 'Talent Passport' or 'APS' job-seeker visa (up to 2 years). After 5 years of legal work, you can apply for a 10-year residency card or French citizenship.", pathway: "Student Visa → APS/Job-Seeker Visa (2 yrs) → Work Visa (5 yrs) → 10-Year Residency Card → Citizenship" },
    jobMarket: { topIndustries: ["Luxury Goods", "Aerospace", "Technology", "Tourism"], avgSalary: "$2,500-5,000/month", demandRoles: ["Software Engineer", "Business Analyst", "Marketing Manager", "Aerospace Engineer"] },
  },
  ireland: {
    visaProcess: [
      { step: 1, title: "Get Admission", description: "Receive a letter of acceptance from a recognized Irish university." },
      { step: 2, title: "Apply for Visa", description: "Submit your student visa application online and pay the fee." },
      { step: 3, title: "Provide Documents", description: "Submit passport, acceptance letter, financial proof, English test results, and health insurance." },
      { step: 4, title: "Attend Interview (If Required)", description: "Some applicants may be called for a visa interview at the Irish embassy." },
      { step: 5, title: "Travel & Register", description: "Upon arrival, register with the Garda National Immigration Bureau (GNIB) and get your IRP card." },
    ],
    prChances: { rating: "High", description: "Ireland offers a 'Stay Back' visa for 2 years after graduation. After 5 years of legal residency, you can apply for long-term residence. The Critical Skills Employment Permit offers a faster PR pathway.", pathway: "Student Visa → Stay Back Visa (2 yrs) → Critical Skills/Work Permit (2 yrs) → Stamp 4 (PR) → Citizenship" },
    jobMarket: { topIndustries: ["Technology", "Pharmaceuticals", "Financial Services", "Medical Devices"], avgSalary: "$3,000-6,000/month", demandRoles: ["Software Engineer", "Pharmacist", "Financial Analyst", "Data Scientist"] },
  },
  "new-zealand": {
    visaProcess: [
      { step: 1, title: "Apply to Institution", description: "Get accepted by a New Zealand educational institution." },
      { step: 2, title: "Apply for Student Visa", description: "Submit your application online through Immigration New Zealand." },
      { step: 3, title: "Provide Documents", description: "Submit passport, offer letter, financial proof, health insurance, and English test results." },
      { step: 4, title: "Health & Character Checks", description: "Complete a medical examination and provide police clearance certificate." },
      { step: 5, title: "Receive Decision", description: "Processing takes 4-8 weeks. The visa allows part-time work during studies." },
    ],
    prChances: { rating: "High", description: "New Zealand offers a 3-year post-study work visa. After working for 2-3 years, you can apply for residence under the Skilled Migrant Category, which uses a points-based system.", pathway: "Student Visa → Post-Study Work Visa (3 yrs) → Skilled Migrant Category Resident Visa (PR) → Citizenship" },
    jobMarket: { topIndustries: ["Agriculture", "Technology", "Tourism", "Healthcare"], avgSalary: "$2,500-5,000/month", demandRoles: ["Software Developer", "Agricultural Scientist", "Registered Nurse", "Civil Engineer"] },
  },
};

export default countryExtras;

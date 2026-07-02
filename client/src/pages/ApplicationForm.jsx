import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { applicationAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const countries = ["Georgia", "Singapore", "Russia", "Malta", "UK", "USA", "Canada", "Australia", "Germany", "France", "Ireland", "New Zealand"];
const educationLevels = ["High School", "Bachelor's Degree", "Master's Degree", "PhD", "Diploma", "Other"];
const englishTests = ["IELTS", "TOEFL", "Duolingo", "PTE", "Cambridge", "Not Yet Taken"];
const courses = ["Computer Science", "Business & Management", "Engineering", "Medicine", "Arts & Humanities", "Law", "Health Sciences", "Other"];

const initialForm = { name: "", email: "", phone: "", country: "", education: "", englishTest: "", course: "", message: "" };

export default function ApplicationForm() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    ...initialForm,
    name: user?.name || "",
    email: user?.email || "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (!form.country) errs.country = "Select a country";
    if (!form.education) errs.education = "Select education level";
    if (!form.englishTest) errs.englishTest = "Select English test";
    if (!form.course) errs.course = "Select course interest";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      await applicationAPI.create(form);
      toast.success("Application submitted successfully!");
      setSubmitted(true);
      if (isAuthenticated) {
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = (field) =>
    `w-full bg-white/5 border ${errors[field] ? "border-red-500/50" : "border-white/10"} rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 ${errors[field] ? "focus:ring-red-500/30" : "focus:ring-primary-500/30"} transition-all`;

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-3xl p-12 text-center max-w-md w-full">
          <div className="w-20 h-20 rounded-full bg-coral/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-display font-bold text-white mb-3">Application Submitted!</h2>
          <p className="text-white/50 mb-8">Thank you for your interest. Our team will contact you within 24 hours.</p>
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="btn-primary inline-block">
            {isAuthenticated ? "View Dashboard" : "Back to Home"}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="container-custom max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Start Your <span className="text-gradient">Journey</span>
          </h1>
          <p className="text-white/40 text-lg">Fill out the form and our experts will guide you.</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-card rounded-3xl p-8 md:p-10 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Full Name *</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className={inputClasses("name")} />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Email *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className={inputClasses("email")} />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Phone *</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className={inputClasses("phone")} />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Preferred Country *</label>
              <select name="country" value={form.country} onChange={handleChange} className={inputClasses("country")}>
                <option value="" className="bg-surface-900">Select Country</option>
                {countries.map((c) => <option key={c} value={c} className="bg-surface-900">{c}</option>)}
              </select>
              {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Education Level *</label>
              <select name="education" value={form.education} onChange={handleChange} className={inputClasses("education")}>
                <option value="" className="bg-surface-900">Select Level</option>
                {educationLevels.map((l) => <option key={l} value={l} className="bg-surface-900">{l}</option>)}
              </select>
              {errors.education && <p className="text-red-400 text-xs mt-1">{errors.education}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">English Test *</label>
              <select name="englishTest" value={form.englishTest} onChange={handleChange} className={inputClasses("englishTest")}>
                <option value="" className="bg-surface-900">Select Test</option>
                {englishTests.map((t) => <option key={t} value={t} className="bg-surface-900">{t}</option>)}
              </select>
              {errors.englishTest && <p className="text-red-400 text-xs mt-1">{errors.englishTest}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Course Interest *</label>
              <select name="course" value={form.course} onChange={handleChange} className={inputClasses("course")}>
                <option value="" className="bg-surface-900">Select Course</option>
                {courses.map((c) => <option key={c} value={c} className="bg-surface-900">{c}</option>)}
              </select>
              {errors.course && <p className="text-red-400 text-xs mt-1">{errors.course}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Additional Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Tell us about your goals..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all resize-none" />
          </div>

          {!isAuthenticated && (
            <p className="text-white/30 text-sm text-center">
              <Link to="/login" className="text-primary-500 hover:text-primary-400">Sign in</Link> to track your application status
            </p>
          )}

          <button type="submit" disabled={loading} className="w-full btn-primary text-base py-4 flex items-center justify-center gap-3 disabled:opacity-50">
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Submitting...
              </>
            ) : "Submit Application"}
          </button>
        </motion.form>
      </div>
    </div>
  );
}

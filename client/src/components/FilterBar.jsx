import { motion } from "framer-motion";

const BUDGETS = [
  { label: "Any Budget", value: "" },
  { label: "Under $5,000", value: "5000" },
  { label: "$5,000 - $15,000", value: "5000-15000" },
  { label: "$15,000 - $30,000", value: "15000-30000" },
  { label: "$30,000+", value: "30000" },
];

const STUDY_LEVELS = [
  { label: "Any Level", value: "" },
  { label: "Undergraduate", value: "ug" },
  { label: "Postgraduate", value: "pg" },
  { label: "MBA", value: "mba" },
  { label: "PhD", value: "phd" },
];

const REGIONS = [
  { label: "All Regions", value: "" },
  { label: "Europe", value: "europe" },
  { label: "Asia", value: "asia" },
  { label: "Middle East", value: "middle-east" },
  { label: "North America", value: "north-america" },
];

const COURSES = [
  { label: "Any Course", value: "" },
  { label: "Computer Science", value: "Computer Science" },
  { label: "Business & Management", value: "Business" },
  { label: "Engineering", value: "Engineering" },
  { label: "Medicine", value: "Medicine" },
  { label: "Arts & Humanities", value: "Arts" },
  { label: "Law", value: "Law" },
];

export default function FilterBar({ filters, onFilterChange, total }) {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({ budget: "", level: "", region: "", course: "" });
  };

  const hasActive = Object.values(filters).some((v) => v !== "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-white">Filters</h3>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/30">{total} results</span>
          {hasActive && (
            <button
              onClick={clearFilters}
              className="text-xs text-primary-400 hover:text-primary-300 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <SelectFilter
          label="Budget"
          value={filters.budget}
          onChange={(v) => handleChange("budget", v)}
          options={BUDGETS}
        />
        <SelectFilter
          label="Study Level"
          value={filters.level}
          onChange={(v) => handleChange("level", v)}
          options={STUDY_LEVELS}
        />
        <SelectFilter
          label="Region"
          value={filters.region}
          onChange={(v) => handleChange("region", v)}
          options={REGIONS}
        />
        <SelectFilter
          label="Course"
          value={filters.course}
          onChange={(v) => handleChange("course", v)}
          options={COURSES}
        />
      </div>
    </motion.div>
  );
}

function SelectFilter({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-white/40 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/30 transition-all appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-surface-900">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

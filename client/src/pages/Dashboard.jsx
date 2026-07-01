import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { applicationAPI } from "../services/api";
import toast from "react-hot-toast";

const statusColors = {
  pending: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400" },
  reviewing: { bg: "bg-primary-500/10", border: "border-primary-500/20", text: "text-primary-400" },
  approved: { bg: "bg-accent-500/10", border: "border-accent-500/20", text: "text-accent-400" },
  rejected: { bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-400" },
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await applicationAPI.getAll();
      setApplications(res.data.applications);
    } catch (err) {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const filteredApps = activeTab === "all"
    ? applications
    : applications.filter((a) => a.status === activeTab);

  const statusCounts = {
    all: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    reviewing: applications.filter((a) => a.status === "reviewing").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="container-custom max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10"
        >
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-1">
              Welcome, {user?.name}
            </h1>
            <p className="text-white/40">{user?.email}</p>
          </div>
          <div className="flex gap-3">
            <Link to="/apply" className="btn-primary text-sm px-6 py-3">
              New Application
            </Link>
            <button onClick={logout} className="btn-secondary text-sm px-6 py-3">
              Sign Out
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8"
        >
          {Object.entries(statusCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`glass-card rounded-xl p-4 text-center transition-all ${
                activeTab === status ? "border-primary-500/30 bg-primary-500/10" : ""
              }`}
            >
              <p className="text-2xl font-bold text-white">{count}</p>
              <p className="text-xs text-white/40 capitalize">{status}</p>
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
                <div className="flex justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="h-4 bg-white/10 rounded w-1/4" />
                    <div className="h-3 bg-white/5 rounded w-1/3" />
                  </div>
                  <div className="h-6 bg-white/10 rounded-full w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="glass-card rounded-3xl p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No applications found</h3>
            <p className="text-white/40 text-sm mb-6">
              {activeTab === "all" ? "You haven't submitted any applications yet." : `No ${activeTab} applications.`}
            </p>
            <Link to="/apply" className="btn-primary text-sm px-6 py-3">
              Start Your Journey
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApps.map((app, i) => {
              const colors = statusColors[app.status];
              return (
                <motion.div
                  key={app._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{app.country}</h3>
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${colors.bg} border ${colors.border} ${colors.text} capitalize`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="text-white/40 text-sm">
                        {app.course} · Applied {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/30 text-xs">
                        ID: {app._id.slice(-8).toUpperCase()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

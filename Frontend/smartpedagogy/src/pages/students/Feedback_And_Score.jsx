import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { BASE_URL } from "../../utils/constants";

const Feedback_And_Score = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null); // For toggling

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get(BASE_URL + "/student-feedbacks", {
          withCredentials: true,
        });
        setFeedbacks(res.data.feedbacks || []);
      } catch (err) {
        console.error("Failed to fetch feedbacks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const renderChart = (evaluations) => {
    const categories = [
      "accuracy",
      "completeness",
      "creativity",
      "reasoning",
      "writingQuality",
      "instructionFollowing",
    ];

    const avgData = categories.map((cat) => {
      const total = evaluations.reduce((sum, e) => sum + (e.feedback[cat] || 0), 0);
      const avg = (total / evaluations.length) * 10; // scale 0–10 to 0–100
      return { name: cat, value: Math.round(avg * 10) / 10 };
    });

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={avgData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[10, 100]} tickFormatter={(tick) => `${tick}`} />
          <Tooltip />
          <Bar
            dataKey="value"
            fill="#2563eb"
            barSize={60}
            radius={[6, 6, 0, 0]}
            className="transition-all duration-300 hover:barSize-40"
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  if (loading) {
    return <p className="text-center text-base-content/70">Loading feedbacks...</p>;
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-4">📚 Feedback & Scores</h2>

      {feedbacks.length === 0 ? (
        <p className="text-center text-error">No feedbacks yet.</p>
      ) : (
        feedbacks.map((item, idx) => (
          <div
            key={idx}
            className="bg-base-100 border border-base-300 shadow-md rounded-lg"
          >
            {/* Header */}
            <button
              onClick={() => toggleExpand(idx)}
              className="w-full text-left p-4 hover:bg-base-200 transition duration-200 flex justify-between items-center"
            >
              <span className="font-semibold text-lg text-neutral-700">
                📄 {item.assignmentTitle}
              </span>
              <span className="text-sm text-neutral-500">
                Submitted: {new Date(item.submittedAt).toLocaleDateString()}
              </span>
            </button>

            {/* Expanded Content */}
            {expandedIndex === idx && (
              <div className="p-4 pt-0 space-y-4">
                <div>{renderChart(item.evaluations)}</div>
                <div>
                  <p className="font-semibold text-base text-neutral-700 mb-1">
                    📝 Overall Feedback
                  </p>
                  <p className="bg-base-200 p-3 rounded-md text-sm text-neutral-700">
                    {item.overallFeedback || "No feedback available."}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Feedback_And_Score;

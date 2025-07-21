import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BASE_URL } from "../../utils/constants";

const Dashboard_Overview = () => {
  const [averageFeedback, setAverageFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAverageFeedback = async () => {
      try {
        const res = await axios.get(BASE_URL + "/student-performance", {
          withCredentials: true,
        });
        setAverageFeedback(res.data.average);
      } catch (err) {
        console.error("Failed to load dashboard overview:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAverageFeedback();
  }, []);

  const renderChart = () => {
    const data = [
      { name: "Accuracy", value: averageFeedback.accuracy },
      { name: "Completeness", value: averageFeedback.completeness },
      { name: "Creativity", value: averageFeedback.creativity },
      { name: "Reasoning", value: averageFeedback.reasoning },
      { name: "Writing", value: averageFeedback.writingQuality },
      { name: "Instructions", value: averageFeedback.instructionFollowing },
      { name: "Average", value: averageFeedback.averageScore },
    ];

    return (
      <div className="w-full bg-base-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-primary">
          📊 Overall Performance Summary
        </h2>
        <ResponsiveContainer width="100%" height={600}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-15}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis domain={[10, 100]} />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
              barSize={80}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="p-4 ">
      {loading ? (
        <p className="text-center text-base-content/70">Loading overview...</p>
      ) : averageFeedback ? (
        renderChart()
      ) : (
        <div className="text-center text-error">
          No assignment feedback found yet.
        </div>
      )}
    </div>
  );
};

export default Dashboard_Overview;

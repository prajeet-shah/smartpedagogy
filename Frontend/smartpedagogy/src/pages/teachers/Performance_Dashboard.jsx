import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Radar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { BASE_URL } from "../../utils/constants";
import { useSelector } from "react-redux";

ChartJS.register(...registerables);

const Performance_Dashboard = () => {
  const user = useSelector((store) => store.user);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/feedback-insights/${user?._id}`
        );
        setInsights(res?.data?.data?.assignments || []);
      } catch (err) {
        console.error("Error loading insights:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchInsights();
  }, [user]);

  if (loading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center text-primary">
        📊 Teacher Assignment Feedback Insights
      </h1>

      {insights.length === 0 ? (
        <p className="text-center text-base-content/70">No assignments found.</p>
      ) : (
        insights.map((assignment) => (
          <div
            key={assignment.id} // ✅ Use 'id' from backend
            className="bg-base-100 rounded-xl p-4 shadow-md space-y-4"
          >
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h2 className="text-xl font-semibold text-primary">
                  {assignment.title}
                </h2>
                <p className="text-sm text-base-content/70">
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </p>
              </div>
              <p className="text-sm text-base-content/70">
                Total Submissions: {assignment.submissionsCount}
              </p>
            </div>

            {assignment.avgScores ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-base-200 p-4 rounded">
                  <h3 className="text-lg font-medium mb-2">
                    📍 Average Scores
                  </h3>
                  <Radar
                    data={{
                      labels: Object.keys(assignment.avgScores),
                      datasets: [
                        {
                          label: "Average %",
                          data: Object.values(assignment.avgScores).map((val) =>
                            parseFloat(val?.replace("%", ""))
                          ),
                          backgroundColor: "rgba(59, 130, 246, 0.2)",
                          borderColor: "#3b82f6",
                        },
                      ],
                    }}
                    options={{
                      scales: {
                        r: {
                          beginAtZero: true,
                          max: 100,
                          ticks: {
                            stepSize: 20,
                            callback: (v) => `${v}%`,
                          },
                        },
                      },
                    }}
                  />
                </div>

                <div className="bg-base-200 p-4 rounded">
                  <h3 className="text-lg font-medium mb-2">📚 Students Overview</h3>
                  <Bar
                    data={{
                      labels: assignment.submissions.map((s) => s.studentName),
                      datasets: [
                        {
                          label: "Overall %",
                          data: assignment.submissions.map((s) =>
                            s.overallScore ? parseFloat(s.overallScore.replace("%", "")) : 0
                          ),
                          backgroundColor: "#3b82f6",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100,
                          ticks: {
                            callback: (v) => `${v}%`,
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-center text-warning mt-2">No feedback data available yet.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Performance_Dashboard;

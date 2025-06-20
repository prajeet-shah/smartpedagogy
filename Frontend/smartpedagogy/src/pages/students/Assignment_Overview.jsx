import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../utils/constants";
import AssignmentSubmission from "./components/AssignmentSubmission";

const Assignment_Overview = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(BASE_URL + "/all-assignments", {
          withCredentials: true,
        });
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="w-full md:w-1/3 lg:w-1/4 overflow-y-auto border-r bg-base-200 p-4">
        <h2 className="text-xl font-bold mb-4 text-primary">Assignments</h2>
        <ul className="space-y-4">
          {assignments.map((assignment) => (
            <li
              key={assignment._id}
              className={`card bg-base-100 shadow border border-base-300 cursor-pointer transition-all ${
                selectedAssignment?._id === assignment._id
                  ? "ring-2 ring-primary"
                  : ""
              }`}
            >
              <div className="card-body p-4">
                <h3 className="card-title text-secondary">
                  {assignment.title}
                </h3>
                <p className="text-sm text-base-content/80 line-clamp-2">
                  {assignment.description}
                </p>
                <p className="text-xs mt-2">
                  <span className="font-semibold">Due:</span>{" "}
                  {new Date(assignment.dueDate).toLocaleDateString()}
                </p>
                <div className="card-actions justify-end mt-2 flex flex-wrap gap-2">
                  <button
                    className="btn btn-outline btn-primary btn-sm"
                    onClick={() =>
                      navigate(`/assignment-details/${assignment._id}`)
                    }
                  >
                    View Assignment
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setSelectedAssignment(assignment)}
                  >
                    Submit Assignment
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Panel */}
      <div className="flex-1 p-6 overflow-y-auto bg-base-100">
        {selectedAssignment ? (
          <AssignmentSubmission assignment={selectedAssignment} />
        ) : (
          <div className="flex justify-center items-center h-full text-base-content/70">
            <p>Select an assignment to submit.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignment_Overview;

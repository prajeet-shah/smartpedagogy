import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import { useNavigate } from "react-router";

const ShowAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/all-assignments`, {
        withCredentials: true,
      });
      setAssignments(res.data);
    } catch (err) {
      console.error("Error fetching assignments:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleView = (id) => {
    navigate(`/assignment-details/${id}`);
  };

  const handleEdit = (id) => {
    // Redirect or open a modal for editing

    navigate(`/edit-assignment/${id}`);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this assignment?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`${BASE_URL}/delete-assignment/${id}`, {
        withCredentials: true,
      });
      setAssignments(assignments.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Delete failed:", err.message);
      alert("Failed to delete assignment");
    }
  };

  return (
    <div className="min-h-screen  px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-primary mb-8">
          All Assignments
        </h1>

        {loading ? (
          <div className="text-center text-lg font-semibold">Loading...</div>
        ) : assignments.length === 0 ? (
          <div className="text-center text-gray-600">No assignments found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-300 rounded-lg shadow-md bg-white">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 text-left">S.No</th>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Due Date</th>
                  <th className="px-4 py-2 text-left">view</th>
                  <th className="px-4 py-2 text-left">Edit</th>
                  <th className="px-4 py-2 text-left">Delete</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment, index) => (
                  <tr
                    key={assignment._id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{assignment.title}</td>
                    <td className="px-4 py-2">
                      {new Date(assignment.dueDate).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleView(assignment._id)}
                        className="text-yellow-600 hover:underline"
                      >
                        View
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(assignment._id)}
                        className="text-yellow-600 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(assignment._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowAssignments;

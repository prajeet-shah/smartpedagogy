// src/pages/AssignmentDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";

const AssignmentDetails = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAssignment = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/assignment/${id}`, {
        withCredentials: true,
      });
      setAssignment(res.data);
    } catch (err) {
      console.error("Failed to load assignment", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignment();
  }, [id]);

  const renderFile = (fileData) => {
    if (!fileData) return null;

    const isPDF = fileData.startsWith("data:application/pdf");
    const blob = fetch(fileData)
      .then(res => res.blob())
      .then(blob => URL.createObjectURL(blob));

    if (isPDF) {
      return (
        <iframe
          src={fileData}
          title="PDF Preview"
          className="w-full h-[500px] border"
        />
      );
    } else {
      return (
        <img
          src={fileData}
          alt="Assignment Preview"
          className="w-full max-w-md mt-4 rounded shadow"
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        {loading ? (
          <div className="text-center text-lg font-semibold">Loading...</div>
        ) : !assignment ? (
          <div className="text-center text-red-600">Assignment not found.</div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-primary mb-4">
              {assignment.title}
            </h1>
            <p className="text-gray-700 mb-4">{assignment.description}</p>
            <p className="text-gray-600 mb-4">
              <strong>Due Date:</strong>{" "}
              {new Date(assignment.dueDate).toLocaleDateString()}
            </p>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Attached File:</h3>
              {renderFile(assignment.file)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AssignmentDetails;

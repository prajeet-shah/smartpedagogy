import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { Link } from "react-router";
import ViewSubmission from "./components/ViewSubmission";

const Classroom_Overview = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(BASE_URL + "/classroom-overview", {
          withCredentials: true,
        });
        setSubmissions(res.data.submissions || []);
      } catch (err) {
        console.error("Error loading submissions:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const openBase64PDFInNewTab = (base64Data) => {
    const match = base64Data.match(/^data:(.*);base64,(.*)$/);
    if (!match) {
      alert("Invalid file format");
      return;
    }

    const mimeType = match[1];
    const base64String = match[2];

    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    const blobUrl = URL.createObjectURL(blob);

    window.open(blobUrl, "_blank");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-primary mb-4">
        📘 Classroom Overview
      </h2>

      {loading ? (
        <p className="text-center text-base-content/70">
          Loading submissions...
        </p>
      ) : submissions.length === 0 ? (
        <p className="text-center text-error">No submissions found.</p>
      ) : (
        submissions.map((sub, idx) => (
          <div
            key={idx}
            className="bg-base-100 border border-base-300 rounded-lg shadow p-4 mb-4"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(idx)}
            >
              <div>
                <p className="font-semibold text-lg">{sub.assignmentTitle}</p>
                <p className="text-sm text-neutral-600">
                  👤 {sub.studentName} | 🗓️{" "}
                  {new Date(sub.submittedAt).toLocaleDateString()}
                </p>
              </div>
              <button className="btn btn-sm btn-outline btn-primary">
                {expandedIndex === idx ? "Hide" : "View"}
              </button>
            </div>

            {expandedIndex === idx && (
              <div className="mt-4 space-y-2">
                <p className="font-medium">💬 Comments:</p>
                <p className="bg-base-200 p-2 rounded">
                  {sub.comments || "None"}
                </p>

                <button
                  onClick={() => openBase64PDFInNewTab(sub.fileBase64)}
                  className="btn btn-sm btn-outline btn-accent"
                >
                  📄 View Submitted File
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Classroom_Overview;

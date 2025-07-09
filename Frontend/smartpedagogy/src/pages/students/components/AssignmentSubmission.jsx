import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";

const AssignmentSubmission = ({ assignment }) => {
  const [comments, setComments] = useState("");
  const [fileBase64, setFileBase64] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const isValidType =
      file.type === "application/pdf" || file.type === "image/jpeg";
    if (!isValidType) {
      setError("Only JPG and PDF files are allowed.");
      return;
    }

    setError("");
    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setFileBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fileBase64) {
      setError("Please upload a valid JPG or PDF file.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess(false);

      const res = await axios.post(
        `${BASE_URL}/submit-assignment`,
        {
          assignmentId: assignment._id,
          fileBase64,
          comments,
        },
        { withCredentials: true }
      );

      if (res.status === 201 || res.status === 200) {
        setSuccess(true);
        setComments("");
        setFileBase64("");
        setFileName("");
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setError("You've already submitted this assignment.");
        setComments("");
        setFileBase64("");
        setFileName("");
      } else {
        setError("Failed to submit assignment.");
        console.error(err);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-primary">Submit Assignment</h2>
      <div className="bg-base-200 p-4 rounded shadow">
        <h3 className="text-lg font-semibold text-secondary">
          {assignment.title}
        </h3>
        <p className="text-sm text-base-content/80 mb-2">
          {assignment.description}
        </p>
        <p className="text-xs mb-4">
          <span className="font-semibold">Due:</span>{" "}
          {new Date(assignment.dueDate).toLocaleDateString()}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">
                Upload your file (JPG or PDF only)
              </span>
            </label>
            <input
              type="file"
              accept=".pdf, .jpg, .jpeg"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
            />
            {fileName && <p className="text-sm mt-1">Selected: {fileName}</p>}
            {error && <p className="text-sm text-error mt-1">{error}</p>}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Comments (optional)</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows="3"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>

          {success && (
            <p className="text-success mt-2">
              Assignment submitted successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AssignmentSubmission;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import ShowAssignments from "./components/ShowAssignments";

export default function Assignment() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [base64File, setBase64File] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignments, setAssignments] = useState([]);

  // 🔄 Fetch assignments once or when called manually
  const fetchAssignments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/all-assignments`, {
        withCredentials: true,
      });
      setAssignments(res.data);
    } catch (err) {
      console.error("Error fetching assignments:", err.message);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const validTypes = ["application/pdf", "image/jpeg"];
    if (!validTypes.includes(selectedFile.type)) {
      alert("Only PDF and JPG files are allowed.");
      return;
    }

    setFile(selectedFile);

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setBase64File(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !dueDate || !base64File) {
      alert("All fields are required.");
      return;
    }

    const payload = {
      title,
      description,
      file: base64File,
      dueDate,
    };

    try {
      await axios.post(BASE_URL + "/add-assignment", payload, {
        withCredentials: true,
      });

      // 🔁 Refresh assignment list after submission
      await fetchAssignments();

      // ✅ Clear form
      setTitle("");
      setDescription("");
      setFile(null);
      setBase64File("");
      setDueDate("");

      alert("Assignment submitted!");
    } catch (err) {
      console.error("Error submitting assignment:", err.message);
      alert("Failed to submit assignment.");
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="w-full mx-auto max-w-2xl bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-primary">
          Assignment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Assignment Title
            </label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Assignment Description
            </label>
            <textarea
              placeholder="Describe the assignment"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full"
              rows={4}
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Upload (PDF or JPG)
            </label>
            <input
              type="file"
              accept=".pdf, .jpg, .jpeg"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
            />
            {file && (
              <p className="mt-2 text-sm text-green-600">
                Selected File: {file.name}
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Add Assignment
          </button>
        </form>
      </div>

      <div className="my-10">
        {/* 👇 Pass down props */}
        <ShowAssignments
          assignments={assignments}
          setAssignments={setAssignments}
          refreshAssignments={fetchAssignments}
        />
      </div>
    </div>
  );
}

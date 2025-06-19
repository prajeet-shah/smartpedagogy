import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import ShowAssignments from "./components/ShowAssignments";

export default function AssignmentForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [base64File, setBase64File] = useState("");
  const [dueDate, setDueDate] = useState("");

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
      setBase64File(reader.result); // base64 string
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !dueDate) {
      alert("All fields including a valid file and due date are required.");
      return;
    }

    const payload = {
      title,
      description,
      file: base64File,
      dueDate,
    };

    //console.log("Submitting assignment:", payload);

    const sendData = async () => {
      const res = await axios.post(BASE_URL + "/add-assignment", payload, {
        withCredentials: true,
      });
      console.log(res.data);
    };

    sendData();

    alert("Assignment submitted!");
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="w-full mx-auto max-w-2xl bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-primary">
          {" "}
          Assignment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Assignment Title
            </label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Assignment Description
            </label>
            <textarea
              placeholder="Describe the assignment"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full border border-gray-300 rounded-lg px-4 py-2"
              rows={4}
             
            />
          </div>

          {/* File Upload */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Upload (PDF or JPG)
            </label>
            <input
              type="file"
              accept=".pdf, .jpg, .jpeg"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full max-w-full"
             
            />
            {file && (
              <p className="mt-2 text-sm text-green-600">
                Selected File: {file.name}
              </p>
            )}
          </div>

          {/* Due Date */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="input input-bordered w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Add Assignment
          </button>
        </form>
      </div>
      <div className="my-10">
        <ShowAssignments />
      </div>
    </div>
  );
}

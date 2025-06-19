import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { BASE_URL } from "../../utils/constants";

const Edit_Assignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState(null); // base64 string

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/assignment/${id}`, {
          withCredentials: true,
        });

        const data = res.data;
        setAssignment(data);
        setTitle(data.title);
        setDescription(data.description);
        setDueDate(new Date(data.dueDate).toISOString().split("T")[0]);
        setFile(data.file); // already base64
      } catch (err) {
        console.error("Error fetching assignment", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [id]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onloadend = () => setFile(reader.result);
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${BASE_URL}/update-assignment/${id}`,
        { title, description, dueDate, file },
        { withCredentials: true }
      );
      alert("Assignment updated successfully");
    } catch (err) {
      console.error("Update failed", err.message);
      alert("Update failed");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-primary">
          Edit Assignment
        </h2>

        <div className="form-control mb-4">
          <label className="label">Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Due Date</label>
          <input
            type="date"
            className="input input-bordered w-full"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div className="form-control mb-6">
          <label className="label">Upload File (PDF or JPG)</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg"
            className="file-input file-input-bordered w-full"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Update Assignment
        </button>
      </form>
    </div>
  );
};

export default Edit_Assignment;

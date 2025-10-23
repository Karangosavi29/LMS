import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AddLesson() {
  const { id: courseId } = useParams(); // get course id from URL
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseId) {
      setMessage("❌ Course ID missing!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("duration", duration);
      if (video) formData.append("video", video);

      const res = await axios.post(
        `http://localhost:5000/api/courses/${courseId}/lessons`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(`✅ ${res.data.message}`);
      setTitle("");
      setDescription("");
      setDuration("");
      setVideo(null);
    } catch (error) {
      console.error("Error adding lesson:", error);
      setMessage("❌ Error adding lesson");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Add Lesson</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Lesson Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Duration</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="e.g. 10 min"
          />
        </div>

        <div>
          <label className="block font-medium">Upload Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Lesson
        </button>

        {message && <p className="mt-3 text-center">{message}</p>}
      </form>
    </div>
  );
}

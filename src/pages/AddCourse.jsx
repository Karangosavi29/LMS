import { useState } from "react";
import axios from "axios";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // 🖼 Upload Thumbnail to Cloudinary
  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/upload/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setThumbnail(data.fileUrl);
      setMessage("Thumbnail uploaded successfully!");
    } catch (error) {
      setMessage("❌ Error uploading thumbnail");
    } finally {
      setUploading(false);
    }
  };

  // 🎥 Upload Video
  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/upload/file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVideoUrl(data.fileUrl);
      setMessage("Video uploaded successfully!");
    } catch (error) {
      setMessage("❌ Error uploading video");
    } finally {
      setUploading(false);
    }
  };

  // 📚 Create Course
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      return setMessage("⚠️ Please login first.");
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/courses",
        { title, description, category, level, price, thumbnail, videoUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("✅ Course created successfully!");
      console.log("Course created:", data);
      setTitle("");
      setDescription("");
      setCategory("");
      setLevel("");
      setPrice("");
      setThumbnail("");
      setVideoUrl("");
    } catch (error) {
      console.error("Error creating course:", error);
      setMessage("❌ Failed to create course");
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Course</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Level (e.g. Beginner)"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
          />

          {/* Thumbnail upload */}
          <div>
            <label className="block mb-2">Upload Thumbnail:</label>
            <input type="file" onChange={handleThumbnailUpload} />
            {thumbnail && <img src={thumbnail} alt="thumb" className="mt-2 h-32 rounded" />}
          </div>

          {/* Video upload */}
          <div>
            <label className="block mb-2">Upload Video:</label>
            <input type="file" onChange={handleVideoUpload} />
            {videoUrl && (
              <video src={videoUrl} controls className="mt-3 w-full rounded" />
            )}
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            {uploading ? "Uploading..." : "Create Course"}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </div>
    </section>
  );
}

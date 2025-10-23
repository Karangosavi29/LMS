import React, { useState } from "react";
import defaultAvatar from "../assets/default-avatar.png"; // fallback image

export default function Profile() {
  // Mock user data (replace with context or props later)
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "jane@example.com",
    photo: null,
    certificates: ["React Basics", "Advanced JavaScript"],
    badges: ["🏅 Top Scorer", "💡 Quick Learner"],
  });

  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    photo: null,
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      name: form.name,
      email: form.email,
      photo: form.photo || prev.photo,
    }));
    setEditOpen(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // handle password change logic
    setPasswordOpen(false);
    alert("Password changed successfully.");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-lg flex items-center space-x-6 mb-6">
        <img
          src={user.photo || defaultAvatar}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
          <div className="mt-4 space-x-2">
            <button
              onClick={() => {
                setEditOpen(true);
                setForm({ name: user.name, email: user.email, photo: null });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Edit Info
            </button>
            <button
              onClick={() => setPasswordOpen(true)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Certificates */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Certificates</h3>
        {user.certificates.length > 0 ? (
          <ul className="list-disc list-inside">
            {user.certificates.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No certificates yet.</p>
        )}
      </div>

      {/* Badges */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Badges</h3>
        {user.badges.length > 0 ? (
          <div className="flex space-x-2 text-2xl">{user.badges.map((b, i) => <span key={i}>{b}</span>)}</div>
        ) : (
          <p className="text-gray-500">No badges yet.</p>
        )}
      </div>

      {/* Edit Info Modal */}
      {editOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
          >
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <label className="block mb-2">
              Name:
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full p-2 border rounded dark:bg-gray-700"
                required
              />
            </label>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full p-2 border rounded dark:bg-gray-700"
                required
              />
            </label>
            <label className="block mb-4">
              Profile Photo:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setForm({ ...form, photo: url });
                  }
                }}
                className="mt-1 block w-full"
              />
            </label>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setEditOpen(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Change Password Modal */}
      {passwordOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            onSubmit={handlePasswordSubmit}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
          >
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <label className="block mb-2">
              Current Password:
              <input
                type="password"
                className="mt-1 w-full p-2 border rounded dark:bg-gray-700"
                required
              />
            </label>
            <label className="block mb-2">
              New Password:
              <input
                type="password"
                className="mt-1 w-full p-2 border rounded dark:bg-gray-700"
                required
              />
            </label>
            <label className="block mb-4">
              Confirm New Password:
              <input
                type="password"
                className="mt-1 w-full p-2 border rounded dark:bg-gray-700"
                required
              />
            </label>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setPasswordOpen(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

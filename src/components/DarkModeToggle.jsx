import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="ml-4 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-md transition"
    >
      {darkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

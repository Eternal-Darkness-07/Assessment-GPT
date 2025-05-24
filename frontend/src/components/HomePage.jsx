// pages/HomePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  const handleGenerate = () => {
    if (!topic.trim() || count <= 0) {
      alert("Please enter valid topic and count");
      return;
    }
    navigate("/test", { state: { topic, count } });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Generate Test</h1>

      <label className="block mb-2 font-semibold">Topic</label>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        placeholder="Enter topic (e.g. React)"
      />

      <label className="block mb-2 font-semibold">Number of Questions</label>
      <input
        type="number"
        min={1}
        value={count}
        onChange={(e) => setCount(parseInt(e.target.value))}
        className="w-full border p-2 rounded mb-6"
      />

      <button
        onClick={handleGenerate}
        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
      >
        Generate
      </button>
    </div>
  );
};

export default HomePage;

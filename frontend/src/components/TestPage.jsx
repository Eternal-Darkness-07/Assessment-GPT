import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MCQCard from "./mcqcard.jsx";
import { getQuestions } from "../api/api.js";

const TestPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { topic, count } = location.state || {};

  // Redirect if missing state
  useEffect(() => {
    if (!topic || !count) {
      navigate("/", { replace: true });
    }
  }, [topic, count, navigate]);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [current, setCurrent] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  // ref to ensure we fetch only once
  const hasFetched = useRef(false);

  useEffect(() => {
    if (topic && count && !hasFetched.current) {
      hasFetched.current = true;      // mark as fetched
      setLoading(true);
      getQuestions(topic, count)
        .then((data) => {
          setQuestions(data);
        })
        .catch(() => alert("Failed to fetch questions"))
        .finally(() => setLoading(false));
    }
  }, [topic, count]);

  const handleSelect = (questionIndex, option) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
    }
  };

  const handlePrev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const handleSubmit = () => {
    const results = questions.map((q, idx) => ({
      question: q,
      userAnswer: userAnswers[idx] || null,
      correctAnswer: q.correctOption,
      explanation: q.explanation,
    }));
    navigate("/result", { state: { results } });
  };

  if (loading) return <p className="text-center mt-20">Loading questions...</p>;
  if (!questions.length) return <p className="text-center mt-20">No questions found.</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Topic: {topic}</h2>
      <p className="mb-4 font-semibold">
        Question {current + 1} of {questions.length}
      </p>

      <MCQCard
        cardKey={current}
        question={questions[current].question}
        options={questions[current].options}
        selectedOption={userAnswers[current] || null}
        onSelect={(option) => handleSelect(current, option)}
      />

      <div className="flex justify-between mt-6">
        <button
          disabled={current === 0}
          onClick={handlePrev}
          className={`px-4 py-2 rounded border ${
            current === 0
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-blue-600 border-blue-600 hover:bg-blue-50"
          }`}
        >
          Previous
        </button>

        {current === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Submit Test
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default TestPage;

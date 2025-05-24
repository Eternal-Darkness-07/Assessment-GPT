import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ResultCard from "./ResultCard";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results;

  // Current question index (like TestPage)
  const [currentIndex, setCurrentIndex] = useState(0);
  // store which explanations are open (by question index)
  const [openExplanations, setOpenExplanations] = useState({});

  if (!results) {
    return (
      <div className="text-center mt-20">
        <p>No result data found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go to Home
        </button>
      </div>
    );
  }

  const toggleExplanation = () => {
    setOpenExplanations((prev) => ({
      ...prev,
      [currentIndex]: !prev[currentIndex],
    }));
  };

  // navigation functions (like TestPage)
  const handleNext = () => {
    if (currentIndex < results.length - 1) {
      setCurrentIndex(currentIndex + 1);
      // Reset explanation state for new question
      setOpenExplanations(prev => ({ ...prev, [currentIndex + 1]: false }));
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinish = () => {
    navigate("/");
  };

  const currentResult = results[currentIndex];
  const isLastQuestion = currentIndex === results.length - 1;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-4">Test Results</h1>
        <div className="text-center text-gray-600">
          Question {currentIndex + 1} of {results.length}
        </div>
        
        
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / results.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <ResultCard
          question={currentResult.question}
          userAnswer={currentResult.userAnswer}
          correctAnswer={currentResult.correctAnswer}
          explanation={currentResult.explanation}
          showExplanation={!!openExplanations[currentIndex]}
          onToggleExplanation={toggleExplanation}
          questionNumber={currentIndex + 1}
          totalQuestions={results.length}
          isLastQuestion={isLastQuestion}
          onFinish={handleFinish}
        />
      </div>

      {/* Navigation buttons (like TestPage) */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            currentIndex === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-600 hover:bg-gray-700 text-white"
          }`}
        >
          Previous
        </button>

        <div className="flex space-x-2">
          {results.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx === currentIndex
                  ? "bg-blue-600"
                  : idx < currentIndex
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>

        {isLastQuestion ? (
          <button
            onClick={handleFinish}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            Finish & Go Home
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
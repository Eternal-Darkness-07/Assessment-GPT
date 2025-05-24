import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const ResultCard = ({
  question,
  userAnswer,
  correctAnswer,
  explanation,
  showExplanation,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const components = {
    p({ node, children }) {
      const hasBlockChild = React.Children.toArray(children).some(
        (child) =>
          React.isValidElement(child) &&
          (child.type === "div" || child.type === "pre")
      );
      if (hasBlockChild) {
        return <>{children}</>;
      }
      return <p className="mb-3">{children}</p>;
    },
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      if (inline) {
        return (
          <code
            className="bg-gray-100 text-sm font-mono px-1 py-0.5 rounded"
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <div className="overflow-auto rounded-lg bg-[#282c34] p-3 w-fit max-w-full mb-4">
          <SyntaxHighlighter
            language={match?.[1] || "javascript"}
            style={oneDark}
            PreTag="div"
            customStyle={{
              background: "none",
              margin: 0,
              padding: 0,
              fontSize: "0.875rem",
              whiteSpace: "pre",
              display: "inline-block",
            }}
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      );
    },
    h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl font-semibold mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg font-medium mb-2">{children}</h3>,
    ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
    li: ({ children }) => <li className="mb-1">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-3">{children}</blockquote>
    ),
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  };

  const getAnswerStatus = () => {
    if (!userAnswer) return "unanswered";
    return userAnswer === correctAnswer ? "correct" : "incorrect";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "correct":
        return "text-green-600";
      case "incorrect":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const status = getAnswerStatus();

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-lg font-semibold text-gray-800 mb-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {question.question}
          </ReactMarkdown>
        </div>
        
        <div className="space-y-3">
          {Object.entries(question.options).map(([option, text]) => (
            <div
              key={option}
              className={`p-3 border rounded-lg ${
                option === correctAnswer
                  ? "border-green-500 bg-green-50"
                  : option === userAnswer && option !== correctAnswer
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200"
              }`}
            >
              <span className="font-medium text-gray-700">{option}.</span>{" "}
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                {text}
              </ReactMarkdown>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <p className={`font-medium ${getStatusColor(status)}`}>
            Your answer: {userAnswer || "Not answered"}
          </p>
          <p className="text-green-600 font-medium">
            Correct answer: {correctAnswer}
          </p>
        </div>

        {showExplanation && explanation && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Explanation:</h4>
            <div className="text-blue-700">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                {explanation}
              </ReactMarkdown>
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-4">
          
          <button
            onClick={openModal}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
          >
            See Detailed Solution
          </button>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div className="fixed inset-0 backdrop-blur-sm z-40"></div>
          
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-4xl max-h-[90vh] overflow-auto p-6 relative w-full">
              
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none"
                  aria-label="Close modal"
                >
                  &times;
                </button>

              <div className="pr-20">
    

                {explanation && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">Detailed Solution:</h3>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                        {explanation}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResultCard;
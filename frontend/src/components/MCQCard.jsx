import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MCQCard = ({ question, options, selectedOption, onSelect }) => {
  const components = {
    p({ children }) {
      const hasBlock = React.Children.toArray(children).some(
        (child) =>
          React.isValidElement(child) &&
          (child.type === "div" || child.type === "pre")
      );

      return hasBlock ? (
        <div className="mb-4">{children}</div>
      ) : (
        <p className="mb-4">{children}</p>
      );
    },

    strong({ children }) {
      return <strong className="font-bold">{children}</strong>;
    },

    em({ children }) {
      return <em className="italic">{children}</em>;
    },

    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const content = String(children).trim();

      if (inline || !match || content.indexOf("\n") === -1) {
        // Inline code or single word/line — no syntax highlighter
        return (
          <code className="bg-gray-100 text-sm font-mono px-1 py-0.5 rounded">
            {content}
          </code>
        );
      }

      return (
        <div className="overflow-auto rounded-lg bg-[#282c34] p-3 w-fit max-w-full my-2">
          <SyntaxHighlighter
            language={match[1]}
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
            {content}
          </SyntaxHighlighter>
        </div>
      );
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-lg font-semibold text-gray-800 mb-4">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {question}
        </ReactMarkdown>
      </div>
      <div className="space-y-3">
        {Object.entries(options).map(([key, value]) => {
          const isSelected = selectedOption === key;
          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`w-full text-left p-3 rounded-md border transition-colors ${
                isSelected
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <span className="inline-block">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={components}
                >
                  {value}
                </ReactMarkdown>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MCQCard;

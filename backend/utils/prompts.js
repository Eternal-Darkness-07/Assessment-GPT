export const ForQuestions = (count, topic) => {
  return `Generate ${count} multiple-choice questions on the topic of ${topic}. Each question should have:
1. The question text
2. 4 options labeled A, B, C, D
3. The correct option (just the letter)
4. A detailed explanation of the correct answer

Respond with ONLY a valid JSON array,

Example:
[
  {
    "question": "...",
    "options": {
      "A": "...",
      "B": "...",
      "C": "...",
      "D": "..."
    },
    "correctOption": "B",
    "explanation": "..."
  },
]

If you cannot generate questions, return an empty array: []
`;
};
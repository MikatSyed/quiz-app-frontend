// components/QuizResults.tsx
import React from "react";
import Link from "next/link";

interface Option {
  id: string;
  content: string;
  type: string;
}

interface Question {
  id: string;
  content: string;
  options: Option[];
  correctOptionId: string;
}

interface QuizResultsProps {
  score: number;
  quizData: Question[];
  userResponses: { [key: string]: string };
  showCorrectAnswers: boolean;
  onToggleCorrectAnswers: () => void;
  onRestart: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  quizData,
  userResponses,
  showCorrectAnswers,
  onToggleCorrectAnswers,
  onRestart,
}) => {
  return (
    <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-center text-purple-900">Your Scores</h2>
      <h3 className="text-lg text-center">
        You scored <span className="font-bold">{score * 10}</span> out of{" "}
        <span className="font-bold">{quizData.length * 10}</span>
      </h3>
      <button
        onClick={onRestart}
        className="bg-purple-800 text-white px-6 py-3 rounded-md hover:bg-purple-900 transition"
      >
        Start the Quiz Again
      </button>
      <div className="flex space-x-2">
        <Link href="/leaderboard">
          <button className="bg-purple-800 text-white py-3 rounded-md hover:bg-purple-900 transition">
            See Leader Board
          </button>
        </Link>
        <button
          onClick={onToggleCorrectAnswers}
          className="bg-purple-800 text-white py-3 rounded-md hover:bg-purple-900 transition"
        >
          {showCorrectAnswers ? "Hide Correct Answers" : "Show Correct Answers"}
        </button>
      </div>

      {showCorrectAnswers && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Results:</h3>
          <ul className="list-disc pl-5 space-y-4">
            {quizData.map((question, index) => {
              const userAnswer = userResponses[question.id];
              const correctAnswer = question.correctOptionId;
              return (
                <div key={question.id} className="bg-gray-100 p-4 rounded-md shadow">
                  <h4 className="font-medium text-md">
                    {index + 1}. {question.content}
                  </h4>
                  <ul className="mt-2">
                    {question.options.map((option) => {
                      let bgColor = "";
                      let showCorrectText = false;

                      // Determine background color and if the correct text should be shown
                      if (userAnswer === option.type) {
                        bgColor = correctAnswer === option.type ? "bg-green-200" : "bg-red-200";
                      } else if (correctAnswer === option.type) {
                        bgColor = "bg-green-200";
                        // Show correct answer text if user's answer is wrong
                        showCorrectText = userAnswer !== correctAnswer;
                      }

                      return (
                        <li key={option.id} className={`p-2 rounded-md list-disc ml-5 ${bgColor}`}>
                          {option.content}{" "}
                          {userAnswer === option.type && <span className="font-semibold">(Your answer)</span>}
                          {showCorrectText && <span className="font-semibold">(Correct answer)</span>}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuizResults;

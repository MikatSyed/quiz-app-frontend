"use client";
import React, { useEffect, useState } from "react";
import { useQuizCategoryQuery } from "@/redux/api/quizApi";

type IDParams = {
  params: any;
};

const QuizPage = ({ params }: IDParams) => {
  const { id } = params;
  console.log(id);
  const [quizData, setQuizData] = useState<
    | {
        content: string;
        options: { id: string; content: string; type: string; questionId: string }[];
        correctOptionId: string;
        CategoryId: string;
        id: string;
      }
    | null
  >(null);
 console.log(quizData);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Fetch quiz data from API
  const { data } = useQuizCategoryQuery(id);
  console.log(data);
  useEffect(() => {
    if (data) {
      setQuizData(data?.data[currentQuestion]);
    }
  }, [data, currentQuestion]);

  function handleOptionSelect(option: any) {
    setSelectedOption(option);
    setShowAnswer(true);
    if (option === quizData?.correctOptionId) {
      setScore((prevScore) => prevScore + 1);
    }
  }

  function handleNextClick() {
    setCurrentQuestion((prevQn) => prevQn + 1);
    setShowAnswer(false);
    if (currentQuestion === (data?.data?.length || 0) - 1) {
      setShowResults(true);
      setCurrentQuestion(0);
    }
  }

  function restartQuiz() {
    setShowResults(false);
    setCurrentQuestion(0);
    setScore(0);
  }

  return (
    <div className="main">
      {showResults ? (
        <div className="quiz-app">
          <h2>Your Scores</h2>
          <h3>
            You scored {score} out {data?.data?.length}
          </h3>
          <button onClick={restartQuiz}>Start the Quiz Again</button>
        </div>
      ) : (
        <div className="quiz-app">
          <div className="quiz-header">
            <h2>Awesome Quiz Application</h2>
          </div>
          <div className="quiz-body">
            <h1>{quizData?.content}</h1>
            <div className="options">
            {quizData?.options?.map((option) => (
  <button
    key={option.id}
    className={`${
      showAnswer && option.type === selectedOption ? "correctAnswer" : ""
    }`}
    onClick={() => handleOptionSelect(option.type)}
  >
    {option.content}
  </button>
))}
            </div>
          </div>
          <div className="quiz-footer">
            <p>
              {currentQuestion + 1} out of {data?.data?.length}
            </p>
            <button onClick={handleNextClick} className="next">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;

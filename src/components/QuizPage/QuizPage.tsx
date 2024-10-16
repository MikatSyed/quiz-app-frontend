"use client"
import React, { useEffect, useState } from "react";
import { useQuizCategoryQuery } from "@/redux/api/quizApi";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "@/components/UI/LoadingSpinner/LoadingSpinner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import noData from '../../../public/assets/no-data.png';
import { useAddLeaderBoardMutation } from "@/redux/api/leader-board";
import { useLoggedUserQuery } from "@/redux/api/userApi";
import QuizResults from "../QuizResults/QuizResults";


const QuizPage = ({ id }: any) => {
  const router = useRouter();
  const [quizData, setQuizData] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [message, setMessage] = useState("");
  const [userResponses, setUserResponses] = useState<{ [key: string]: string }>({});
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

  const { data: userData } = useLoggedUserQuery(undefined);
  const [addLeaderBoard] = useAddLeaderBoardMutation();
  const { data, isLoading } = useQuizCategoryQuery(id);

  useEffect(() => {
    if (data) {
      setQuizData(data.data);
      setMessage("");
    } else {
      setQuizData([]);
    }
  }, [data]);

  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [message]);

  function handleOptionSelect(option: string) {
    setSelectedOption(option);
    setShowAnswer(true);
    setMessage("");
    setUserResponses((prev) => ({
      ...prev,
      [quizData[currentQuestion].id]: option
    }));

    if (option === quizData[currentQuestion].correctOptionId) {
      setScore((prevScore) => prevScore + 1);
    }
  }

  async function handleNextClick() {
    if (!selectedOption) {
      setMessage("Please select an option before proceeding.");
      return;
    }

    setCurrentQuestion((prevQn) => prevQn + 1);
    setShowAnswer(false);
    setSelectedOption("");

    if (currentQuestion === quizData.length - 1) {
      setShowResults(true);
      if (userData && userData.data) {
        await addLeaderBoard({
          userId: userData.data.id,
          score: score * 10,
          categoryId: id,
        });
      }
    }
  }

  function restartQuiz() {
    setShowResults(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption("");
    setMessage("");
    setUserResponses({});
    setShowCorrectAnswers(false);
  }

  function handleBack() {
    router.push("/category");
  }

  function toggleCorrectAnswers() {
    setShowCorrectAnswers((prev) => !prev);
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-center justify-center flex-col p-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : quizData.length > 0 ? (
          showResults ? (
            <QuizResults
              score={score}
              quizData={quizData}
              userResponses={userResponses}
              showCorrectAnswers={showCorrectAnswers}
              onToggleCorrectAnswers={toggleCorrectAnswers}
              onRestart={restartQuiz}
            />
          ) : (
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg flex flex-col gap-6">
              <div className="border-b pb-4">
                <h2 className="text-2xl font-semibold text-center text-purple-900">
                  Awesome Quiz Application
                </h2>
              </div>
              <div className="flex flex-col">
                <>
                  <h1 className="text-xl font-medium text-gray-700">{quizData[currentQuestion]?.content}</h1>
                  <div className="flex flex-col gap-2 mt-4">
                    {quizData[currentQuestion]?.options?.map((option:any) => (
                      <button
                        key={option.id}
                        className={`px-4 py-2 rounded-md border border-gray-300 ${
                          showAnswer && option.type === selectedOption
                            ? "bg-purple-800 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                        onClick={() => handleOptionSelect(option.type)}
                      >
                        {option.content}
                      </button>
                    ))}
                  </div>
                </>
              </div>

              <div className="border-t pt-4 flex justify-between items-center">
                <p className="font-semibold">
                  {currentQuestion + 1} out of {quizData.length}
                </p>
                <button
                  onClick={handleNextClick}
                  className="bg-purple-800 text-white px-6 py-2 rounded-md hover:bg-purple-900"
                >
                  Next
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Image src={noData} alt="No Data" className="mb-4 img-fluid" height={500} width={500} />
            <h1 className="text-xl font-medium text-gray-800 mb-4">No quiz data available.</h1>
            <button
              onClick={handleBack}
              className="bg-purple-800 text-white px-6 py-2 rounded-md hover:bg-purple-900"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizPage;

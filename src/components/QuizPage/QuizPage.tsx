"use client";
import React, { useEffect, useState } from "react";
import { useQuizCategoryQuery } from "@/redux/api/quizApi";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "@/components/UI/LoadingSpinner/LoadingSpinner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import noData from '../../../public/assets/no-data.png';
import { useAddLeaderBoardMutation } from "@/redux/api/leader-board";
import { useLoggedUserQuery } from "@/redux/api/userApi";

const QuizPage = ({ id }: any) => {
  const router = useRouter();
  const [quizData, setQuizData] = useState<{
    content: string;
    options: { id: string; content: string; type: string; questionId: string }[];
    correctOptionId: string;
    CategoryId: string;
    id: string;
  } | null>(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [message, setMessage] = useState("");
  
  // Fetch logged-in user data
  const { data: userData } = useLoggedUserQuery(undefined);
  
  // Leaderboard mutation
  const [addLeaderBoard] = useAddLeaderBoardMutation();

  // Fetch quiz data based on the category ID
  const { data, isLoading } = useQuizCategoryQuery(id);

  useEffect(() => {
    if (data) {
      setQuizData(data?.data[currentQuestion]);
      setMessage(""); 
    } else {
      setQuizData(null);
    }
  }, [data, currentQuestion]);

  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [message]);

  function handleOptionSelect(option: any) {
    setSelectedOption(option);
    setShowAnswer(true);
    setMessage("");
    if (option === quizData?.correctOptionId) {
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
    if (currentQuestion === (data?.data?.length || 0) - 1) {
      setShowResults(true);
      if (userData && userData.data) {
      await  addLeaderBoard({
          userId: userData.data.id,
          score: score,
          categoryId: id,
        })
         
      }
    }
  }

  function restartQuiz() {
    setShowResults(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption("");
    setMessage("");
  }

  function handleBack() {
    router.push("/category");
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-center justify-center flex-col p-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : data?.data?.length > 0 ? (
          showResults ? (
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-center">Your Scores</h2>
              <h3 className="text-lg text-center">
                You scored {score} out of {data?.data?.length}
              </h3>
              <button
                onClick={restartQuiz}
                className="bg-purple-800 text-white px-6 py-2 rounded-md hover:bg-purple-900"
              >
                Start the Quiz Again
              </button>
            </div>
          ) : (
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg flex flex-col gap-6">
              <div className="border-b pb-4">
                <h2 className="text-2xl font-semibold text-center text-purple-900">
                  Awesome Quiz Application
                </h2>
              </div>
              <div className="flex flex-col">
                <>
                  <h1 className="text-xl font-medium text-gray-700">{quizData?.content}</h1>
                  <div className="flex flex-col gap-2 mt-4">
                    {quizData?.options?.map((option) => (
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
                  {currentQuestion + 1} out of {data?.data?.length}
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

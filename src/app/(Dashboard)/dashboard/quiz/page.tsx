"use client";

import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDeleteQuizMutation, useQuizesQuery } from "@/redux/api/quizApi";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const Quiz = () => {
  const { data } = useQuizesQuery(undefined);
  const [deleteQuiz] = useDeleteQuizMutation()

  const handleDelete = async(quizId: string) => {
    // Implement your delete logic here
    console.log(quizId);
   const res =  await deleteQuiz(quizId).unwrap()
   console.log(res);
   toast(res?.message, {
    icon: <span style={{ color: "white" }}>✔</span>,
    style: {
      borderRadius: "10px",
      background: "#82498c",
      color: "#fff",
    },
    duration: 2000,
  });

  };


  return (
   <>
     <Toaster position="top-center" reverseOrder={false} />
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-semibold mb-4">Quiz List</h2>

      <div className="flex justify-end mb-4">
       <Link href="/dashboard/quiz/create">
       <button className="bg-purple-800 text-white py-2 px-4 rounded-full">
          Add Quiz
        </button>
       </Link>
      </div>

      <table className="min-w-full bg-white border border-gray-300 shadow">
        <thead>
          <tr>
            
            <th className="py-2 px-4 border-b">Content</th>
            <th className="py-2 px-4 border-b">Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((quiz:any) => (
            <tr key={quiz.id}>
            
              <td className="py-2 px-4 border-b">{quiz.content}</td>
              <td className="py-2 px-4 border-b">
               <Link href={`/dashboard/quiz/edit/${quiz.id}`}>
               <button className="mr-2">
                  <FaEdit className="text-blue-500 cursor-pointer hover:text-blue-700" />
                </button>
               </Link>
                <button  onClick={() => handleDelete(quiz.id)}>
                  <FaTrash className="text-red-500 cursor-pointer hover:text-red-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   </>
  );
};

export default Quiz;

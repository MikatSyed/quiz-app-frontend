"use client";
import React from "react";
import { FaCrown } from "react-icons/fa"; // Import the crown icon from Font Awesome
import Navbar from "../Navbar/Navbar";
import { useLeaderBoardsQuery } from "@/redux/api/leader-board";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

// Define the TypeScript type for a leaderboard entry
type LeaderboardEntry = {
  id: string;
  username: string;
  score: number;
  categoryName: string;
  createdAt: string;
};

// Leaderboard component
const Leaderboard: React.FC = () => {
  // Fetch the leaderboard data
  const { data, isLoading, error } = useLeaderBoardsQuery(undefined);
  console.log(data, "21");

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Error fetching leaderboard data.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10">
        <div className="rounded-lg p-4">
          <h2 className="text-4xl font-semibold text-center mb-6">
            Leaderboard
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-purple-800 text-white text-left text-sm uppercase font-semibold">
                    Rank
                  </th>
                  <th className="py-2 px-4 bg-purple-800 text-white text-left text-sm uppercase font-semibold">
                    User
                  </th>
                  <th className="py-2 px-4 bg-purple-800 text-white text-left text-sm uppercase font-semibold">
                    Score
                  </th>
                  <th className="py-2 px-4 bg-purple-800 text-white text-left text-sm uppercase font-semibold">
                    Category
                  </th>
                  <th className="py-2 px-4 bg-purple-800 text-white text-left text-sm uppercase font-semibold">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {data && data?.data?.length > 0 ? (
                  data?.data?.map((user: LeaderboardEntry, index: number) => (
                    <tr
                      key={user.id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-gray-200`}
                    >
                      <td className="py-2 px-4 border-b flex items-center">
                        {index === 0 && (
                          <FaCrown className="text-yellow-500 mr-2" size={20} />
                        )}
                        {index + 1}
                      </td>
                      <td className="py-2 px-4 border-b">{user.username}</td>
                      <td className="py-2 px-4 border-b">{user.score}</td>
                      <td className="py-2 px-4 border-b">
                        {user.categoryName}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {new Date(user.createdAt).toLocaleString("en-US", {
                          // weekday: 'long',
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          // hour: '2-digit',
                          // minute: '2-digit',
                          // second: '2-digit',
                          hour12: true,
                        })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;

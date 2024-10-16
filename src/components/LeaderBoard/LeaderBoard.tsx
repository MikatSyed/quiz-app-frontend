import React from "react";
import { FaCrown } from "react-icons/fa"; // Import the crown icon from Font Awesome

// Define the TypeScript type for a user object
type User = {
  id: number;
  username: string;
  score: number;
};

// Leaderboard component
const Leaderboard: React.FC = () => {
  // Sample leaderboard data
  const data: User[] = [
    { id: 1, username: "Alice", score: 95 },
    { id: 2, username: "Bob", score: 90 },
    { id: 3, username: "Charlie", score: 85 },
    { id: 4, username: "David", score: 80 },
    { id: 5, username: "Eve", score: 75 },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-center mb-6">Leaderboard</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-purple-800 text-white text-left text-sm uppercase font-semibold">Rank</th>
                <th className="py-2 px-4 bg-purple-800 text-white text-left text-sm uppercase font-semibold">User</th>
                <th className="py-2 px-4 bg-purple-800 text-white text-left text-sm uppercase font-semibold">Score</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((user, index) => (
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

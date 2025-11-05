import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase.js";
import { useEffect, useState } from "react";
import { useCallback } from "react";

function Leaderboard() {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserInfo = useCallback(async () => {
    try {
      const refUsers = collection(db, "users");
      const data = await getDocs(refUsers);
      const users = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const finalScore = users.map((user) =>
        user.totalScore == undefined ? { ...user, totalScore: Infinity } : user
      );
      setInfo(finalScore.sort((a, b) => a.totalScore - b.totalScore));
    } catch (error) {
      console.error("Error fetching user info: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserInfo();
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;
  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-sm rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time Taken
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {info.map((entry, index) => (
              <tr key={entry.id} className="even:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {entry?.name || "Unknown User"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {entry?.phone || "-"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {entry?.email || "-"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {entry?.totalScore ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;

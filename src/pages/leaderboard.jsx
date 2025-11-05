import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase.js";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function Leaderboard() {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;



  const getUserInfo = useCallback(async () => {
    try {
      const refUsers = collection(db, "users");
      const data = await getDocs(refUsers);

      const users = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const finalScore = users.map((user) => ({
        ...user,
        totalScore: user.totalScore === undefined ? Infinity : Number(user.totalScore),
      }));

      const sortedData = finalScore.sort((a, b) => {
        if (a.totalScore === Infinity) return 1;
        if (b.totalScore === Infinity) return -1;
        return a.totalScore - b.totalScore;
      });

      setInfo(sortedData);
    } catch (error) {
      // Keep a single error log and fall back to an empty list
      console.error("Error fetching user info:", error);
      setInfo([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const totalPages = Math.max(1, Math.ceil(info.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = info.slice(startIndex, endIndex);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Leaderboard</h1>
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] bg-gray-50">Rank</TableHead>
              <TableHead className="bg-gray-50">Name</TableHead>
              <TableHead className="bg-gray-50">Phone</TableHead>
              <TableHead className="bg-gray-50">Email</TableHead>
              <TableHead className="text-right bg-gray-50">Time Taken (s)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((entry, index) => (
              <TableRow key={entry.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{startIndex + index + 1}</TableCell>
                <TableCell>{entry?.name || "Unknown User"}</TableCell>
                <TableCell>{entry?.phone || "-"}</TableCell>
                <TableCell>{entry?.email || "-"}</TableCell>
                <TableCell className="text-right">
                  {entry?.totalScore === Infinity ? "-" : entry?.totalScore}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex items-center justify-between px-2">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1}-{Math.min(endIndex, info.length)} of {info.length} entries
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            <PaginationItem>
              <span className="px-4 text-sm">
                Page {currentPage} of {totalPages}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default Leaderboard;

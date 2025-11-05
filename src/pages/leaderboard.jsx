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

  // Dummy data for testing
  const dummyData = [
    { id: 1, name: "John Doe", phone: "123-456-7890", email: "john@example.com", totalScore: 120 },
    { id: 2, name: "Jane Smith", phone: "234-567-8901", email: "jane@example.com", totalScore: 145 },
    { id: 3, name: "Bob Johnson", phone: "345-678-9012", email: "bob@example.com", totalScore: 98 },
    { id: 4, name: "Alice Brown", phone: "456-789-0123", email: "alice@example.com", totalScore: 156 },
    { id: 5, name: "Charlie Davis", phone: "567-890-1234", email: "charlie@example.com", totalScore: 134 },
    { id: 6, name: "Eva Wilson", phone: "678-901-2345", email: "eva@example.com", totalScore: 167 },
    { id: 7, name: "Frank Miller", phone: "789-012-3456", email: "frank@example.com", totalScore: 189 },
    { id: 8, name: "Grace Lee", phone: "890-123-4567", email: "grace@example.com", totalScore: 143 },
    { id: 9, name: "Henry Taylor", phone: "901-234-5678", email: "henry@example.com", totalScore: 132 },
    { id: 10, name: "Ivy Clark", phone: "012-345-6789", email: "ivy@example.com", totalScore: 178 },
    { id: 11, name: "Jack Adams", phone: "123-456-7891", email: "jack@example.com", totalScore: 165 },
    { id: 12, name: "Kelly White", phone: "234-567-8902", email: "kelly@example.com", totalScore: 192 },
    { id: 13, name: "Liam Harris", phone: "345-678-9013", email: "liam@example.com", totalScore: 147 },
    { id: 14, name: "Mia Turner", phone: "456-789-0124", email: "mia@example.com", totalScore: 159 },
    { id: 15, name: "Noah King", phone: "567-890-1235", email: "noah@example.com", totalScore: 183 }
  ];

  const getUserInfo = useCallback(async () => {
    try {
      console.log("Fetching data from Firebase...");
      const refUsers = collection(db, "users");
      const data = await getDocs(refUsers);
      console.log("Raw Firebase data:", data.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      
      const users = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const finalScore = users.map((user) => ({
        ...user,
        totalScore: user.totalScore === undefined ? Infinity : Number(user.totalScore)
      }));
      const sortedData = finalScore.sort((a, b) => {
        if (a.totalScore === Infinity) return 1;
        if (b.totalScore === Infinity) return -1;
        return a.totalScore - b.totalScore;
      });
      
      console.log("Processed data:", sortedData);
      setInfo(sortedData);

      // Fallback to dummy data if no Firebase data
      if (sortedData.length === 0) {
        console.log("No Firebase data found, using dummy data");
        setInfo(dummyData.sort((a, b) => a.totalScore - b.totalScore));
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      console.log("Using dummy data due to error");
      setInfo(dummyData.sort((a, b) => a.totalScore - b.totalScore));
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

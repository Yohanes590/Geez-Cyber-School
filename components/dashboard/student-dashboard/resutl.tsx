"use client"

import LoadingScreen from "../loading-screen/loading-screen"
import { checkingUserRole } from "@/lib/user-authentication"
import { useEffect, useState } from "react"

type Result = {
  id: number
  studentName: string
  subjects: { name: string; score: number; status: "Passed" | "Failed" | "Pending" }[]
}

export default function ResultSection() {
  const [results, setResults] = useState<Result[]>([])
  const [selectedResult, setSelectedResult] = useState<Result | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    checkingUserRole()
    // Mock student results with real-world cyber lab subjects
    setResults([
      {
        id: 1,
        studentName: "Student You",
        subjects: [
          { name: "Web Security - XSS Lab", score: 85, status: "Passed" },
          { name: "SQL Injection Lab", score: 78, status: "Passed" },
          { name: "JWT Algorithm Confusion", score: 92, status: "Passed" },
        ],
      },
      {
        id: 2,
        studentName: "Student You",
        subjects: [
          { name: "Cryptography Lab", score: 65, status: "Passed" },
          { name: "Hashing & Encryption", score: 55, status: "Passed" },
          { name: "Network Security Lab", score: 40, status: "Failed" },
        ],
      },
    ])
  }, [])

  const openModal = (result: Result) => {
    setSelectedResult(result)
    setShowModal(true)
  }

  const closeModal = () => {
    setSelectedResult(null)
    setShowModal(false)
  }

  const statusColors = {
    Passed: "bg-green-200 text-green-800",
    Failed: "bg-red-200 text-red-800",
    Pending: "bg-yellow-200 text-yellow-800",
  }

  return (
    <>
      <LoadingScreen />
      <div className="main-assignment ml-[400px] pt-[70px] px-6">
        <h1 className="text-2xl font-semibold mb-6">My Results 🏆</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((res) => (
            <div
              key={res.id}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition hover:scale-105 flex flex-col justify-between"
            >
              <h2 className="text-lg font-bold mb-2">{res.studentName}</h2>
              <p className="text-gray-600 mb-4">{res.subjects.length} Subjects Completed</p>

              <button
                onClick={() => openModal(res)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition self-start"
              >
                View Subjects
              </button>
            </div>
          ))}
        </div>

        {/* Modal for Subjects */}
        {showModal && selectedResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000003f] bg-opacity-50">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative animate-fadeIn">
              <h2 className="text-xl font-bold mb-4">{selectedResult.studentName}'s Subjects</h2>
              <ul className="space-y-3">
                {selectedResult.subjects.map((sub, index) => (
                  <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                    <span className="font-semibold">{sub.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{sub.score}%</span>
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-semibold ${
                          statusColors[sub.status]
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </>
  )
}

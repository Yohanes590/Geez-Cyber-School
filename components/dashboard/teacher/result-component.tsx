"use client"
import { useEffect, useState } from "react"
import LoadingScreen from "../loading-screen/loading-screen"
import { checkingUserRole } from "@/lib/user-authentication"
import { User, BookOpen, Pencil } from "lucide-react"

type Result = {
  id: number
  studentName: string
  subject: string
  score: number
}

export default function TeacherResultsSection() {
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState<Result[]>([])

  useEffect(() => {
    checkingUserRole()
    setTimeout(() => {
      setResults([
        { id: 1, studentName: "Abebe Tasew", subject: "Web Security & Ethical Hacking", score: 85 },
        { id: 2, studentName: "Demes Aragaw", subject: "Network Fundamentals", score: 78 },
        { id: 3, studentName: "Bante Yergaw", subject: "Database Systems", score: 92 },
        { id: 4, studentName: "Mulat Fikru", subject: "Advanced JavaScript", score: 88 },
      ])
      setLoading(false)
    }, 300)
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <div className="main-dashboard ml-[400px] pt-[70px] pr-[30px] h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">📊 Student Results</h1>
      </div>

      {/* Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result) => (
          <div
            key={result.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 border border-gray-100"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full">
                  <User size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{result.studentName}</h2>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <BookOpen size={14} /> {result.subject}
                  </p>
                </div>
              </div>

              <button className="text-gray-500 hover:text-indigo-600 transition">
                <Pencil size={18} />
              </button>
            </div>

            <div className="flex items-center justify-between mt-2 text-gray-600">
              <span className="text-sm font-medium">Score: {result.score}%</span>
              {result.score >= 50 ? (
                <span className="text-green-600 font-medium">Pass</span>
              ) : (
                <span className="text-red-600 font-medium">Fail</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {results.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No results available. Add student scores to get started.
        </div>
      )}
    </div>
  )
}

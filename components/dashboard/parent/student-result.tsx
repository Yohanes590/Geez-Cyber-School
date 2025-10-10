"use client"
import { checkingUserRole } from "@/lib/user-authentication"
import LoadingScreen from "../loading-screen/loading-screen"
import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts"

export default function ParentStudentResult() {
  const [loadingControl, setLoading] = useState<boolean>(true)

  // Sample student result data
  const studentResult = [
    { subject: "Math", grade: 85 },
    { subject: "Science", grade: 92 },
    { subject: "English", grade: 78 },
    { subject: "History", grade: 88 },
    { subject: "Art", grade: 95 }
  ]

  useEffect(() => {
    checkingUserRole()
    setLoading(false)
  }, [])

  if (loadingControl) return <LoadingScreen />

  return (
    <div className="main-parent ml-[400px] pt-[50px] px-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-700">Student Result</h1>
        <p className="text-gray-500 mt-1">Check your student’s grades and performance</p>
      </div>

      {/* Result Table */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-10 max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Grades by Subject</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-gray-600 font-medium">Subject</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">Grade</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {studentResult.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">{item.subject}</td>
                  <td className="px-4 py-3 text-gray-700">{item.grade}</td>
                  <td className="px-4 py-3">
                    {item.grade >= 75 ? (
                      <span className="text-green-600 font-semibold">Pass</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Fail</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Result Chart */}
      <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Performance Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={studentResult} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="grade" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

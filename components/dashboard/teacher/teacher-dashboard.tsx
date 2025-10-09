"use client"

import { useEffect, useState } from "react"
import { checkingUserRole } from "@/lib/user-authentication"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Users, BookOpen, FileCheck, TrendingUp } from "lucide-react"
import LoadingScreen from "../loading-screen/loading-screen"
import { Toaster, toast } from "react-hot-toast"

export default function TeacherDashboard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkingUserRole()
      setLoading(false)
  }, [])

  const stats = [
    { title: "Active Students", value: 124, icon: <Users className="text-blue-600" />, color: "bg-blue-50" },
    { title: "Total Assignments", value: 42, icon: <BookOpen className="text-green-600" />, color: "bg-green-50" },
    { title: "Completed Reviews", value: 31, icon: <FileCheck className="text-yellow-600" />, color: "bg-yellow-50" },
    { title: "Average Score", value: "89%", icon: <TrendingUp className="text-purple-600" />, color: "bg-purple-50" },
  ]

  const chartData = [
    { month: "Jan", submissions: 30, graded: 22 },
    { month: "Feb", submissions: 42, graded: 37 },
    { month: "Mar", submissions: 39, graded: 35 },
    { month: "Apr", submissions: 45, graded: 41 },
    { month: "May", submissions: 50, graded: 46 },
    { month: "Jun", submissions: 38, graded: 33 },
    { month: "Jul", submissions: 47, graded: 44 },
  ]

  const performanceData = [
    { week: "Week 1", avgScore: 78 },
    { week: "Week 2", avgScore: 82 },
    { week: "Week 3", avgScore: 88 },
    { week: "Week 4", avgScore: 91 },
  ]

  if (loading) return <LoadingScreen />

  return (
    <>
      <Toaster position="bottom-right" />
      <div className="main-dashboard ml-[400px] pt-[70px] pr-[30px]">
        <h1 className="text-[30px] font-bold text-[#2d2d2d] mb-2">Teacher Dashboard</h1>
        <p className="text-gray-500 mb-6">Monitor student performance and lab progress in real-time</p>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-5 mb-10">
          {stats.map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-between rounded-xl p-5 shadow-sm border border-gray-200 ${item.color}`}
            >
              <div>
                <h3 className="text-[16px] font-semibold text-gray-700">{item.title}</h3>
                <p className="text-[24px] font-bold text-gray-900">{item.value}</p>
              </div>
              <div className="p-3 bg-white rounded-full shadow-md">{item.icon}</div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Assignment Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="submissions" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                <Bar dataKey="graded" fill="#60a5fa" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Performance Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avgScore" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Teacher Activities</h2>
          <ul className="divide-y divide-gray-100">
            <li className="py-3 flex justify-between items-center">
              <span className="text-gray-700">Reviewed “Web Security Lab #3” submissions</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span className="text-gray-700">Posted new assignment “SQL Injection Practice”</span>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span className="text-gray-700">Updated student progress reports</span>
              <span className="text-sm text-gray-500">1 day ago</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

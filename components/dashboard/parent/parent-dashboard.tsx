"use client"
import { checkingUserRole } from "@/lib/user-authentication"
import LoadingScreen from "../loading-screen/loading-screen"
import { useEffect, useState } from "react"
import Link from "next/link"
import { CreditCard, DollarSign, Clock, User, BarChart3 } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from "recharts"

export default function ParentDashboard() {
  const [loadingControl, setLoading] = useState<boolean>(true)

  useEffect(() => {
    checkingUserRole()
    setLoading(false)
  }, [])

  if (loadingControl) return <LoadingScreen />

  // Sample Data
  const studentData = [
    { subject: "Math", grade: 85 },
    { subject: "Science", grade: 92 },
    { subject: "English", grade: 78 },
    { subject: "History", grade: 88 },
    { subject: "Art", grade: 95 }
  ]

  const paymentData = [
    { month: "Jan", amount: 200 },
    { month: "Feb", amount: 150 },
    { month: "Mar", amount: 300 },
    { month: "Apr", amount: 250 },
    { month: "May", amount: 400 }
  ]

  return (
    <div className="main-parent ml-[400px] pt-[50px] px-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-700">Parent Dashboard</h1>
        <p className="text-gray-500 mt-1">Monitor your student’s academic and payment info</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        {/* Student Info */}
        <Link
          href="/dashboard/parent/student-info"
          className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-shadow cursor-pointer"
        >
          <User className="text-blue-500 w-10 h-10" />
          <div>
            <h2 className="font-semibold text-gray-700 text-lg">Student Info</h2>
            <p className="text-gray-500 mt-1">View your student’s personal details</p>
          </div>
        </Link>

        {/* Student Result */}
        <Link
          href="/dashboard/parent/student-result"
          className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-shadow cursor-pointer"
        >
          <BarChart3 className="text-green-500 w-10 h-10" />
          <div>
            <h2 className="font-semibold text-gray-700 text-lg">Student Result</h2>
            <p className="text-gray-500 mt-1">Check grades and performance</p>
          </div>
        </Link>

        {/* Payment Status */}
        <Link
          href="/dashboard/parent/payment-status"
          className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-shadow cursor-pointer"
        >
          <CreditCard className="text-purple-500 w-10 h-10" />
          <div>
            <h2 className="font-semibold text-gray-700 text-lg">Payment Status</h2>
            <p className="text-gray-500 mt-1">View current fees and payments</p>
          </div>
        </Link>

        {/* Pay Fees */}
        <Link
          href="/dashboard/parent/pay-fees"
          className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-shadow cursor-pointer"
        >
          <DollarSign className="text-yellow-500 w-10 h-10" />
          <div>
            <h2 className="font-semibold text-gray-700 text-lg">Pay Fees</h2>
            <p className="text-gray-500 mt-1">Make fee payments easily</p>
          </div>
        </Link>

        {/* Payment History */}
        <Link
          href="/dashboard/parent/payment-history"
          className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-shadow cursor-pointer"
        >
          <Clock className="text-red-500 w-10 h-10" />
          <div>
            <h2 className="font-semibold text-gray-700 text-lg">Payment History</h2>
            <p className="text-gray-500 mt-1">Review all past transactions</p>
          </div>
        </Link>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Performance Chart */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="font-semibold text-gray-700 mb-4">Student Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={studentData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="grade" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Overview Chart */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="font-semibold text-gray-700 mb-4">Payment Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={paymentData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

"use client"
import { checkingUserRole } from "@/lib/user-authentication"
import LoadingScreen from "../loading-screen/loading-screen"
import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

export default function ParentPaymentHistory() {
  const [loadingControl, setLoading] = useState<boolean>(true)

  // Sample payment history data
  const paymentHistory = [
    { month: "January", amount: 200, status: "Paid", date: "2025-01-10" },
    { month: "February", amount: 150, status: "Paid", date: "2025-02-15" },
    { month: "March", amount: 300, status: "Paid", date: "2025-03-20" },
    { month: "April", amount: 250, status: "Paid", date: "2025-04-18" },
    { month: "May", amount: 400, status: "Paid", date: "2025-05-12" }
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
        <h1 className="text-3xl font-bold text-gray-700">Payment History</h1>
        <p className="text-gray-500 mt-1">Review all past payments of your student</p>
      </div>

      {/* Payment History Table */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-10 max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Payments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-gray-600 font-medium">Month</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">Amount ($)</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">Status</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">Date Paid</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">{payment.month}</td>
                  <td className="px-4 py-3 text-gray-700">{payment.amount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`font-semibold ${
                        payment.status === "Paid" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Trend Chart */}
      <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Payment Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={paymentHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
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
  )
}

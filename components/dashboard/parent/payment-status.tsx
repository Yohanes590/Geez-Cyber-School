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

export default function ParentPaymentStatus() {
  const [loadingControl, setLoading] = useState<boolean>(true)

  // Sample payment data
  const payments = [
    { month: "January", amount: 200, status: "Paid" },
    { month: "February", amount: 150, status: "Pending" },
    { month: "March", amount: 300, status: "Paid" },
    { month: "April", amount: 250, status: "Pending" },
    { month: "May", amount: 400, status: "Paid" }
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
        <h1 className="text-3xl font-bold text-gray-700">Payment Status</h1>
        <p className="text-gray-500 mt-1">Track your student’s fee payments</p>
      </div>

      {/* Payment Table */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-10 max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Monthly Payments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-gray-600 font-medium">Month</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">Amount ($)</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">{payment.month}</td>
                  <td className="px-4 py-3 text-gray-700">{payment.amount}</td>
                  <td className="px-4 py-3">
                    {payment.status === "Paid" ? (
                      <span className="text-green-600 font-semibold">{payment.status}</span>
                    ) : (
                      <span className="text-red-600 font-semibold">{payment.status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Overview Chart */}
      <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Payment Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={payments} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

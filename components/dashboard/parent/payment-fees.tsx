"use client"
import { checkingUserRole } from "@/lib/user-authentication"
import LoadingScreen from "../loading-screen/loading-screen"
import { useEffect, useState } from "react"

export default function ParentPayFees() {
  const [loadingControl, setLoading] = useState<boolean>(true)
  const [selectedAmount, setSelectedAmount] = useState<number>(0)

  // Sample fee data
  const fees = [
    { id: 1, title: "Tuition Fee", amount: 200, status: "Pending" },
    { id: 2, title: "Library Fee", amount: 50, status: "Paid" },
    { id: 3, title: "Lab Fee", amount: 100, status: "Pending" },
    { id: 4, title: "Sports Fee", amount: 80, status: "Pending" }
  ]

  useEffect(() => {
    checkingUserRole()
    setLoading(false)
  }, [])

  if (loadingControl) return <LoadingScreen />

  const totalDue = fees.filter(f => f.status === "Pending").reduce((acc, f) => acc + f.amount, 0)
  const totalPaid = fees.filter(f => f.status === "Paid").reduce((acc, f) => acc + f.amount, 0)

  const handlePay = () => {
    alert(`Paid $${selectedAmount}. Implement payment gateway here.`)
  }

  return (
    <div className="main-parent ml-[400px] pt-[50px] px-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-700">Pay Fees</h1>
        <p className="text-gray-500 mt-1">Manage and pay your student’s pending fees</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <p className="text-gray-500 font-medium">Total Due</p>
          <p className="text-2xl font-bold text-red-600 mt-2">${totalDue}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <p className="text-gray-500 font-medium">Total Paid</p>
          <p className="text-2xl font-bold text-green-600 mt-2">${totalPaid}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <p className="text-gray-500 font-medium">Remaining</p>
          <p className="text-2xl font-bold text-yellow-600 mt-2">${totalDue}</p>
        </div>
      </div>

      {/* Fee Items Table */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-10 max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Fee Items</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-gray-600 font-medium">Title</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">Amount ($)</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">Status</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">Select</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee) => (
                <tr key={fee.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">{fee.title}</td>
                  <td className="px-4 py-3 text-gray-700">{fee.amount}</td>
                  <td className="px-4 py-3">
                    {fee.status === "Paid" ? (
                      <span className="text-green-600 font-semibold">{fee.status}</span>
                    ) : (
                      <span className="text-red-600 font-semibold">{fee.status}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {fee.status === "Pending" && (
                      <input
                        type="checkbox"
                        value={fee.amount}
                        onChange={(e) => setSelectedAmount(Number(e.target.value))}
                        className="w-5 h-5"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pay Button */}
      <div className="max-w-4xl">
        <button
          onClick={handlePay}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          disabled={selectedAmount === 0}
        >
          Pay ${selectedAmount}
        </button>
      </div>
    </div>
  )
}

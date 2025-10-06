"use client"

import LoadingScreen from "../loading-screen/loading-screen"
import { checkingUserRole } from "@/lib/user-authentication"
import { useEffect, useState } from "react"

type Assignment = {
  id: number
  title: string
  description: string
  dueDate: string
  status: "Pending" | "In Progress" | "Completed"
  details: string
}

export default function AssignmentDashboard() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    checkingUserRole()
    setAssignments([
      {
        id: 1,
        title: "SQL Injection Lab",
        description: "Practice SQL injection on DVWA vulnerable form",
        dueDate: "2025-10-12",
        status: "Pending",
        details:
          "In this lab, you will practice exploiting SQL Injection vulnerabilities on a vulnerable web form. Make sure to test safely in the lab environment.",
      },
      {
        id: 2,
        title: "XSS Lab",
        description: "Cross-site scripting exercises on demo pages",
        dueDate: "2025-10-14",
        status: "In Progress",
        details:
          "This lab focuses on XSS vulnerabilities. Try both reflected and stored XSS on provided lab pages. Document your findings.",
      },
      {
        id: 3,
        title: "JWT Algorithm Confusion Lab",
        description: "Explore JWT HS256 vs RS256 verification",
        dueDate: "2025-10-20",
        status: "Completed",
        details:
          "Understand the JWT algorithm confusion vulnerability. Experiment with HS256 tokens being verified with RS256 public keys. Submit screenshots of successful exploits.",
      },
    ])
  }, [])

  const statusColors = {
    Pending: "bg-yellow-200 text-yellow-800",
    "In Progress": "bg-blue-200 text-blue-800",
    Completed: "bg-green-200 text-green-800",
  }

  const openModal = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedAssignment(null)
  }

  return (
    <>
      <LoadingScreen />
      <div className="main-assignment ml-[400px] pt-[70px] px-6">
        <h1 className="text-2xl font-semibold mb-6">Hi, Welcome 👋</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition-shadow relative flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-bold mb-2">{assignment.title}</h2>
                <p className="text-gray-600 mb-4">{assignment.description}</p>
                <p className="text-sm text-gray-500 mb-4">Due: {assignment.dueDate}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[assignment.status]}`}
                >
                  {assignment.status}
                </span>
                <button
                  onClick={() => openModal(assignment)}
                  className="px-4 py-2 cursor-pointer bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && selectedAssignment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000003f] bg-opacity-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative animate-fadeIn">
              <h2 className="text-xl font-bold mb-4">{selectedAssignment.title}</h2>
              <p className="text-gray-700 mb-4">{selectedAssignment.details}</p>
              <p className="text-sm text-gray-500 mb-4">Due: {selectedAssignment.dueDate}</p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[selectedAssignment.status]}`}
              >
                {selectedAssignment.status}
              </span>
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

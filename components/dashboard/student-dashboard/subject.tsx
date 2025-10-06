"use client"

import LoadingScreen from "../loading-screen/loading-screen"
import { checkingUserRole } from "@/lib/user-authentication"
import { useEffect, useState } from "react"

type Subject = {
  id: number
  name: string
  description: string
  assignments: number
  color: string
  assignmentList: { id: number; title: string; dueDate: string }[]
}

export default function SubjectSection() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    checkingUserRole()
    // Mock subjects
    setSubjects([
      {
        id: 1,
        name: "Web Security",
        description: "Learn about vulnerabilities like XSS, SQLi, and CSRF.",
        assignments: 5,
        color: "bg-red-200 text-red-800",
        assignmentList: [
          { id: 1, title: "XSS Lab", dueDate: "2025-10-12" },
          { id: 2, title: "SQLi Lab", dueDate: "2025-10-14" },
        ],
      },
      {
        id: 2,
        name: "Cryptography",
        description: "Understand encryption, hashing, and JWT attacks.",
        assignments: 3,
        color: "bg-blue-200 text-blue-800",
        assignmentList: [
          { id: 1, title: "JWT Lab", dueDate: "2025-10-20" },
          { id: 2, title: "Hashing Lab", dueDate: "2025-10-22" },
        ],
      },
      {
        id: 3,
        name: "Network Security",
        description: "Explore penetration testing and network vulnerabilities.",
        assignments: 4,
        color: "bg-green-200 text-green-800",
        assignmentList: [
          { id: 1, title: "Port Scanning Lab", dueDate: "2025-10-18" },
        ],
      },
      {
        id: 4,
        name: "Ethical Hacking",
        description: "Hands-on labs on offensive security techniques.",
        assignments: 6,
        color: "bg-purple-200 text-purple-800",
        assignmentList: [
          { id: 1, title: "Phishing Simulation", dueDate: "2025-10-25" },
        ],
      },
    ])
  }, [])

  const openModal = (subject: Subject) => {
    setSelectedSubject(subject)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedSubject(null)
  }

  return (
    <>
      <LoadingScreen />
      <div className="main-assignment ml-[400px] pt-[70px] px-6">
        <h1 className="text-2xl font-semibold mb-6">Subjects Overview 🎯</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition hover:scale-105 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-bold mb-2">{subject.name}</h2>
                <p className="text-gray-600 mb-4">{subject.description}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${subject.color}`}>
                  {subject.assignments} Assignments
                </span>
                <button
                  onClick={() => openModal(subject)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && selectedSubject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000057] bg-opacity-50">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative animate-fadeIn">
              <h2 className="text-xl font-bold mb-4">{selectedSubject.name}</h2>
              <p className="text-gray-700 mb-4">{selectedSubject.description}</p>
              <h3 className="font-semibold mb-2">Assignments:</h3>
              <ul className="mb-4 space-y-2">
                {selectedSubject.assignmentList.map((ass) => (
                  <li key={ass.id} className="flex justify-between bg-gray-100 p-2 rounded-lg">
                    <span>{ass.title}</span>
                    <span className="text-gray-500 text-sm">{ass.dueDate}</span>
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

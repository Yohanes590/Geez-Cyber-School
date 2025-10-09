"use client"
import { useEffect, useState } from "react"
import LoadingScreen from "../loading-screen/loading-screen"
import { checkingUserRole } from "@/lib/user-authentication"
import { BookOpen, Users, PlusCircle, Pencil, Trash2, X } from "lucide-react"

type Subject = {
  id: number
  name: string
  code: string
  students: number
}

export default function TeacherSubjectsSection() {
  const [loading, setLoading] = useState(true)
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [showModal, setShowModal] = useState(false)
  const [newSubject, setNewSubject] = useState({ name: "", code: "", students: "" })

  useEffect(() => {
    checkingUserRole()
    setTimeout(() => {
      setSubjects([
        { id: 1, name: "Web Security & Ethical Hacking", code: "SEC301", students: 45 },
        { id: 2, name: "Network Fundamentals", code: "NET210", students: 32 },
        { id: 3, name: "Database Systems", code: "DBS204", students: 28 },
        { id: 4, name: "Advanced JavaScript", code: "JS305", students: 40 },
      ])
      setLoading(false)
    }, 300)
  }, [])

  const handleAddSubject = () => {
    if (!newSubject.name.trim() || !newSubject.code.trim()) return

    const newEntry: Subject = {
      id: subjects.length + 1,
      name: newSubject.name,
      code: newSubject.code,
      students: Number(newSubject.students) || 0,
    }

    setSubjects([...subjects, newEntry])
    setNewSubject({ name: "", code: "", students: "" })
    setShowModal(false)
  }

  if (loading) return <LoadingScreen />

  return (
    <div className="main-dashboard ml-[400px] pt-[70px] pr-[30px] h-screen bg-gray-50 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">📘 My Subjects</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <PlusCircle size={18} />
          <span>Add Subject</span>
        </button>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 border border-gray-100"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full">
                  <BookOpen size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{subject.name}</h2>
                  <p className="text-sm text-gray-500">{subject.code}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="text-gray-500 hover:text-indigo-600 transition">
                  <Pencil size={18} />
                </button>
                <button className="text-gray-500 hover:text-red-600 transition">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Users size={18} />
                <span className="text-sm">{subject.students} Students</span>
              </div>
              <button className="text-indigo-600 font-medium text-sm hover:underline">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {subjects.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No subjects assigned yet. Add one to get started.
        </div>
      )}

      {/* Fullscreen Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#00000041] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full h-full sm:w-[50%] sm:h-[50%] rounded-lg shadow-lg p-6 flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Add New Subject</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex flex-col flex-1 justify-center items-center gap-5 px-10">
              <input
                type="text"
                placeholder="Subject Name"
                value={newSubject.name}
                onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                className="border border-gray-300 rounded px-4 py-3 w-full max-w-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Subject Code"
                value={newSubject.code}
                onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                className="border border-gray-300 rounded px-4 py-3 w-full max-w-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="number"
                placeholder="Number of Students"
                value={newSubject.students}
                onChange={(e) => setNewSubject({ ...newSubject, students: e.target.value })}
                className="border border-gray-300 rounded px-4 py-3 w-full max-w-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t pt-4 mt-6 gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubject}
                className="px-5 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Add Subject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

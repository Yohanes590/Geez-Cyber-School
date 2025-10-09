"use client"
import { useEffect, useState } from "react"
import LoadingScreen from "../loading-screen/loading-screen"
import { checkingUserRole } from "@/lib/user-authentication"
import { User, Mail, Phone, Trash2, Pencil } from "lucide-react"

type Student = {
  id: number
  name: string
  email: string
  phone: string
  assignmentsCompleted: number
}

export default function TeacherStudentsSection() {
  const [loading, setLoading] = useState(true)
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    checkingUserRole()
    setTimeout(() => {
      setStudents([
        { id: 1, name: "Abebe Tasew", email: "abebe@example.com", phone: "+251912345678", assignmentsCompleted: 8 },
        { id: 2, name: "Demes Aragaw", email: "demes@example.com", phone: "+251911234567", assignmentsCompleted: 7 },
        { id: 3, name: "Bante Yergaw", email: "bante@example.com", phone: "+251910987654", assignmentsCompleted: 9 },
        { id: 4, name: "Mulat Fikru", email: "mulat@example.com", phone: "+251913210987", assignmentsCompleted: 6 },
      ])
      setLoading(false)
    }, 300)
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <div className="main-dashboard ml-[400px] pt-[70px] pr-[30px] h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">👩‍🎓 My Students</h1>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          <User size={18} />
          <span>Add Student</span>
        </button>
      </div>

      {/* Student Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 border border-gray-100"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full">
                  <User size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{student.name}</h2>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Mail size={14} /> {student.email}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Phone size={14} /> {student.phone}
                  </p>
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

            <div className="flex items-center justify-between mt-2 text-gray-600">
              <span className="text-sm">{student.assignmentsCompleted} Assignments Completed</span>
              <button className="text-indigo-600 font-medium text-sm hover:underline">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {students.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No students assigned yet. Add one to get started.
        </div>
      )}
    </div>
  )
}

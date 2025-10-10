"use client"
import { checkingUserRole } from "@/lib/user-authentication"
import LoadingScreen from "../loading-screen/loading-screen"
import { useEffect, useState } from "react"

export default function ParentStudentInfo() {
  const [loadingControl, setLoading] = useState<boolean>(true)

  // Sample student data (replace with API data later)
  const student = {
    name: "John Doe",
    class: "Grade 10",
    rollNumber: "23",
    dob: "2009-05-14",
    gender: "Male",
    guardian: "Jane Doe",
    contact: "+123 456 7890",
    address: "123 Main Street, City, Country"
  }

  useEffect(() => {
    checkingUserRole()
    setLoading(false)
  }, [])

  if (loadingControl) return <LoadingScreen />

  return (
    <div className="main-parent ml-[400px] pt-[50px] px-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-700">Student Information</h1>
        <p className="text-gray-500 mt-1">View detailed information about your student</p>
      </div>

      {/* Student Info Card */}
      <div className="bg-white shadow-md rounded-xl p-8 max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Basic Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500 font-medium">Name</p>
            <p className="text-gray-700">{student.name}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Class</p>
            <p className="text-gray-700">{student.class}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Roll Number</p>
            <p className="text-gray-700">{student.rollNumber}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Date of Birth</p>
            <p className="text-gray-700">{student.dob}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Gender</p>
            <p className="text-gray-700">{student.gender}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Guardian</p>
            <p className="text-gray-700">{student.guardian}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Contact</p>
            <p className="text-gray-700">{student.contact}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Address</p>
            <p className="text-gray-700">{student.address}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

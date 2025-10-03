"use client"
import StudentDashboard from "@/components/dashboard/student-dashboard/student-dashboard"
import StudentSideNav from "@/components/dashboard/side-nav/student-side-nav/student-side-nav"
export default function RenderStudentDashboard() {
      return <>
      <StudentSideNav/>
      <StudentDashboard/>
      </> 
}
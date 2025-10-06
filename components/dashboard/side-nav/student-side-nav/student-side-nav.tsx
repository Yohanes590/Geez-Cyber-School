"use client"
import { usePathname, useRouter } from "next/navigation"
import { BookCopy, Clock, Folder, LayoutDashboard, LogOut, MessageCircle, Settings } from "lucide-react"
import Cookies from "js-cookie"
import { Toaster, toast } from "react-hot-toast"

export default function StudentSideNav() {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard />, path: "/dashboard/student" },
    { name: "Assignment", icon: <Folder />, path: "/dashboard/student/assignment" },
    { name: "Chat", icon: <MessageCircle />, path: "/dashboard/student/chat" },
    { name: "Subjects", icon: <BookCopy />, path: "/dashboard/student/subject" },
  ]

  const logOut = () => {
    if (confirm("Are you sure you want to logout?")) {
      Cookies.remove("token")
      window.location.reload()
    } else {
      toast.error("Logout canceled")
    }
  }

  return (
    <>
      <Toaster position="bottom-right" />
      <div className="side-nav-container z-40 w-[350px] rounded-[0px_20px_20px_0px] bg-white shadow-[#00000038] shadow-[0_0_20px] fixed h-[100%] transition-all duration-500">
        <div className="logo-container pt-[70px] pl-[20px]">
          <h1 className="text-[25px] font-bold text-[#8b8b8b]">Cyber School</h1>
          <p className="text-[#636161]">Dashboard Monitor</p>
        </div>

        <div className="click-container w-[100%] flex justify-center mt-[50px]">
          <div className="center-item w-[85%]">
            {navItems.map((item, i) => {
              const isActive = pathname === item.path
              return (
                <div
                  key={i}
                  onClick={() => router.push(item.path)}
                  className={`click-time mt-[5px] flex rounded-[10px] w-[100%] gap-2 items-center pl-[20px] cursor-pointer h-[65px] transition-all duration-300 ${
                    isActive
                      ? "bg-[#e8f0ff] text-blue-600 font-semibold"
                      : "text-[#555] hover:bg-[#f1f5ff]"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </div>
              )
            })}

            <div className="additional-container mt-[20px] text-blue-500 text-[20px] cursor-default">
              Additional Option
            </div>

            <div
              className={`click-time mt-[5px] flex rounded-[10px] w-[100%] gap-2 items-center pl-[20px] cursor-pointer h-[65px] transition-all duration-300 ${
                pathname === "/dashboard/student/result"
                  ? "bg-[#e8f0ff] text-blue-600 font-semibold"
                  : "text-[#555] hover:bg-[#f1f5ff]"
              }`}
              onClick={() => router.push("/dashboard/student/result")}
            >
              <Clock /> Result
            </div>

            <div
              className={`click-time mt-[5px] flex rounded-[10px] w-[100%] gap-2 items-center pl-[20px] cursor-pointer h-[65px] transition-all duration-300 ${
                pathname === "/dashboard/student/setting"
                  ? "bg-[#e8f0ff] text-blue-600 font-semibold"
                  : "text-[#555] hover:bg-[#f1f5ff]"
              }`}
              onClick={() => router.push("/dashboard/student/setting")}
            >
              <Settings /> Setting
            </div>

            <div
              onClick={logOut}
              className="click-time mt-[5px] flex rounded-[10px] w-[80%] gap-2 items-center pl-[20px] cursor-pointer text-red-500 h-[65px] absolute bottom-10 transition-all duration-300 hover:bg-[#fff1f1]"
            >
              <LogOut /> Logout
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

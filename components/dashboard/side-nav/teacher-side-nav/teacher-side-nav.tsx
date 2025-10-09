"use client"

import { usePathname, useRouter } from "next/navigation"
import { BookCopy, Clock, LayoutDashboard, MessageCircle, Settings, Users, LogOut } from "lucide-react"
import Cookies from "js-cookie"
import { Toaster, toast } from "react-hot-toast"
import LoadingScreen from "../../loading-screen/loading-screen"

export default function TeacherSideNav() {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard />, link: "/dashboard/teacher" },
    { name: "Chat", icon: <MessageCircle />, link: "/dashboard/teacher/chat" },
    { name: "Subjects", icon: <BookCopy />, link: "/dashboard/teacher/subjects" },
    { name: "Students", icon: <Users />, link: "/dashboard/teacher/students" },
    { name: "Result", icon: <Clock />, link: "/dashboard/teacher/result" },
    { name: "Setting", icon: <Settings />, link: "/dashboard/teacher/setting" },
  ]

  const logOut = () => {
    if (confirm("Are you sure you want to log out?")) {
      Cookies.remove("token")
      router.push("/")
      toast.success("Logged out successfully")
    } else {
      toast.error("Logout cancelled")
    }
  }

  return (
    <>
      <Toaster position="bottom-right" />
      <div className="loading-screen">
        <LoadingScreen />
      </div>

      <div className="side-nav-container z-40 w-[350px] rounded-[0px_20px_20px_0px] bg-white shadow-[#00000038] shadow-[0_0_20px] fixed h-[100%]">
        <div className="logo-container pt-[70px] pl-[20px]">
          <h1 className="text-[25px] font-bold text-[#8b8b8b]">Cyber School</h1>
          <p className="text-[#636161]">Teacher Panel</p>
        </div>

        <div className="click-container w-[100%] flex justify-center mt-[50px]">
          <div className="center-item w-[85%]">
            {navItems.map((item, index) => (
              <div
                key={index}
                onClick={() => router.push(item.link)}
                className={`click-time mt-[5px] flex rounded-[10px] w-[100%] gap-2 items-center pl-[20px] cursor-pointer h-[65px] transition-all duration-500 ${
                  pathname === item.link
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-blue-500 hover:bg-[#f1f5ff]"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </div>
            ))}

            <div
              onClick={logOut}
              className="click-time mt-[5px] flex rounded-[10px] w-[80%] gap-2 items-center pl-[20px] cursor-pointer text-red-500 h-[65px] absolute bottom-10 transition-all duration-500 hover:bg-[#fff1f1]"
            >
              <LogOut />
              Logout
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

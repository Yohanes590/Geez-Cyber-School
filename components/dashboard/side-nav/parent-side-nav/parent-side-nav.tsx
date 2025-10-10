"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  CreditCard,
  DollarSign,
  Clock,
  BarChart3,
  Settings,
  User
} from "lucide-react"
import LoadingScreen from "../../loading-screen/loading-screen"

export default function ParentSideNav() {
  const pathname = usePathname()

  const links = [
    { href: "/dashboard/parent", label: "Dashboard Overview", icon: <LayoutDashboard /> },
    { href: "/dashboard/parent/student-info", label: "Student Information", icon: <User /> },
    { href: "/dashboard/parent/student-result", label: "Student Result", icon: <BarChart3 /> },
    { href: "/dashboard/parent/payment-status", label: "Payment Status", icon: <CreditCard /> },
    { href: "/dashboard/parent/pay-fees", label: "Pay Fees", icon: <DollarSign /> },
    { href: "/dashboard/parent/payment-history", label: "Payment History", icon: <Clock /> },
    { href: "/dashboard/parent/setting", label: "Settings", icon: <Settings /> }
  ]

  return (
    <>
      <div className="loading-screen">
        <LoadingScreen />
      </div>

      <div className="side-nav-container z-40 w-[350px] rounded-[0px_20px_20px_0px] bg-white shadow-[#00000038] shadow-[0_0_20px] fixed h-[100%]">
        {/* Logo Section */}
        <div className="logo-container pt-[70px] pl-[20px]">
          <h1 className="text-[25px] font-bold text-[#8b8b8b]">Cyber School</h1>
          <p className="text-[#636161]">Parent Dashboard</p>
        </div>

        {/* Navigation Section */}
        <div className="click-container w-[100%] flex justify-center mt-[50px]">
          <div className="center-item w-[85%]">
            {/* First group */}
            {links.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`click-time mt-[5px] flex rounded-[10px] w-full gap-2 items-center pl-[20px] cursor-pointer h-[65px] transition-all duration-500 ${
                  pathname === link.href
                    ? "bg-[#f1f5ff] text-blue-600 font-semibold"
                    : "text-blue-500 hover:bg-[#f1f5ff]"
                }`}
              >
                {link.icon} {link.label}
              </Link>
            ))}

            {/* Payment Section */}
            <div className="additional-container mt-[20px] text-blue-500 text-[20px] cursor-default">
              Payment Options
            </div>

            {links.slice(3, 6).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`click-time mt-[5px] flex rounded-[10px] w-full gap-2 items-center pl-[20px] cursor-pointer h-[65px] transition-all duration-500 ${
                  pathname === link.href
                    ? "bg-[#f1f5ff] text-blue-600 font-semibold"
                    : "text-blue-500 hover:bg-[#f1f5ff]"
                }`}
              >
                {link.icon} {link.label}
              </Link>
            ))}

            {/* Settings Section */}
            <div className="additional-container mt-[20px] text-blue-500 text-[20px] cursor-default">
              Account
            </div>

            <Link
              href={links[6].href}
              className={`click-time mt-[5px] flex rounded-[10px] w-full gap-2 items-center pl-[20px] cursor-pointer h-[65px] transition-all duration-500 ${
                pathname === links[6].href
                  ? "bg-[#f1f5ff] text-blue-600 font-semibold"
                  : "text-blue-500 hover:bg-[#f1f5ff]"
              }`}
            >
              {links[6].icon} {links[6].label}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

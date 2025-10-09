"use client"
import { useEffect, useState } from "react"
import LoadingScreen from "../loading-screen/loading-screen"
import { checkingUserRole } from "@/lib/user-authentication"
import { Settings, Bell, Shield } from "lucide-react"

type Setting = {
  id: number
  title: string
  description: string
  icon: "shield" | "bell" | "settings" // use string instead of JSX.Element
}

export default function TeacherSettingsSection() {
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState<Setting[]>([])

  useEffect(() => {
    checkingUserRole()
    setTimeout(() => {
      setSettings([
        { id: 1, title: "Account Security", description: "Manage password & login", icon: "shield" },
        { id: 2, title: "Notifications", description: "Email & SMS alerts", icon: "bell" },
        { id: 3, title: "General Settings", description: "Other app preferences", icon: "settings" },
      ])
      setLoading(false)
    }, 300)
  }, [])

  if (loading) return <LoadingScreen />

  const renderIcon = (icon: Setting["icon"]) => {
    switch (icon) {
      case "shield":
        return <Shield size={22} className="text-indigo-600" />
      case "bell":
        return <Bell size={22} className="text-indigo-600" />
      case "settings":
        return <Settings size={22} className="text-indigo-600" />
      default:
        return null
    }
  }

  return (
    <div className="main-dashboard ml-[400px] pt-[70px] pr-[30px] h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">⚙️ Settings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {settings.map((setting) => (
          <div
            key={setting.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 border border-gray-100 cursor-pointer"
            onClick={() => alert(`Clicked on ${setting.title}`)}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-indigo-100 rounded-full">{renderIcon(setting.icon)}</div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{setting.title}</h2>
                <p className="text-sm text-gray-500">{setting.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {settings.length === 0 && (
        <div className="text-center text-gray-500 mt-10">No settings available.</div>
      )}
    </div>
  )
}

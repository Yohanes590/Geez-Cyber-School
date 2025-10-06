"use client"

import { useEffect, useState } from "react"
import LoadingScreen from "../loading-screen/loading-screen"
import { checkingUserRole } from "@/lib/user-authentication"
import toast, { Toaster } from "react-hot-toast"

type Settings = {
  theme: "light" | "dark" | "auto"
  notifications: { assignments: boolean; chats: boolean; deadlines: boolean }
  lab: { autoSave: boolean; hints: boolean; debugMode: boolean }
  privacy: { showActivity: boolean; twoFactorAuth: boolean }
}

export default function StudentSettings() {
  const [settings, setSettings] = useState<Settings>({
    theme: "auto",
    notifications: { assignments: true, chats: true, deadlines: true },
    lab: { autoSave: true, hints: true, debugMode: false },
    privacy: { showActivity: false, twoFactorAuth: false },
  })

  useEffect(() => {
    checkingUserRole()
    // Fetch real settings from API if needed
  }, [])

  const toggleSetting = <T extends keyof Omit<Settings, "theme">>(
    section: T,
    key: keyof Settings[T]
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !(prev[section][key] as boolean),
      },
    }))
    toast.success(`${key.toString()} toggled!`) // toast notification
  }

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings((prev) => ({ ...prev, theme: e.target.value as Settings["theme"] }))
    toast.success(`Theme set to ${e.target.value}`)
  }

  const handleAdvancedAction = (action: string) => {
    toast.success(`${action} executed successfully!`) // replace alert with toast
  }

  return (
    <>
      <LoadingScreen />
      <div className="main-assignment ml-[400px] pt-[70px] px-6">
        <h1 className="text-3xl font-bold mb-8 text-indigo-600">Student Settings ⚙️</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Theme */}
          <div className="bg-gradient-to-tr from-indigo-50 to-indigo-100 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition transform hover:scale-[1.02]">
            <h2 className="font-bold text-xl mb-4 text-indigo-700">Theme Mode</h2>
            <select
              value={settings.theme}
              onChange={handleThemeChange}
              className="w-full border border-indigo-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>

          {/* Notifications */}
          <div className="bg-gradient-to-tr from-green-50 to-green-100 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition transform hover:scale-[1.02]">
            <h2 className="font-bold text-xl mb-4 text-green-700">Notifications</h2>
            {Object.keys(settings.notifications).map((key) => (
              <label
                key={key}
                className="flex justify-between items-center bg-green-100 px-4 py-2 rounded-lg mb-3 cursor-pointer hover:bg-green-200 transition"
              >
                <span className="capitalize">{key} notifications</span>
                <input
                  type="checkbox"
                  checked={settings.notifications[key as keyof typeof settings.notifications]}
                  onChange={() => toggleSetting("notifications", key as keyof typeof settings.notifications)}
                  className="w-5 h-5 accent-green-600"
                />
              </label>
            ))}
          </div>

          {/* Lab Environment */}
          <div className="bg-gradient-to-tr from-yellow-50 to-yellow-100 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition transform hover:scale-[1.02]">
            <h2 className="font-bold text-xl mb-4 text-yellow-700">Lab Environment</h2>
            {Object.keys(settings.lab).map((key) => (
              <label
                key={key}
                className="flex justify-between items-center bg-yellow-100 px-4 py-2 rounded-lg mb-3 cursor-pointer hover:bg-yellow-200 transition"
              >
                <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                <input
                  type="checkbox"
                  checked={settings.lab[key as keyof typeof settings.lab]}
                  onChange={() => toggleSetting("lab", key as keyof typeof settings.lab)}
                  className="w-5 h-5 accent-yellow-600"
                />
              </label>
            ))}
          </div>

          {/* Privacy & Security */}
          <div className="bg-gradient-to-tr from-red-50 to-red-100 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition transform hover:scale-[1.02]">
            <h2 className="font-bold text-xl mb-4 text-red-700">Privacy & Security</h2>
            {Object.keys(settings.privacy).map((key) => (
              <label
                key={key}
                className="flex justify-between items-center bg-red-100 px-4 py-2 rounded-lg mb-3 cursor-pointer hover:bg-red-200 transition"
              >
                <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                <input
                  type="checkbox"
                  checked={settings.privacy[key as keyof typeof settings.privacy]}
                  onChange={() => toggleSetting("privacy", key as keyof typeof settings.privacy)}
                  className="w-5 h-5 accent-red-600"
                />
              </label>
            ))}
          </div>

        </div>

        {/* Advanced Actions */}
        <div className="bg-gradient-to-tr from-indigo-50 to-indigo-100 shadow-lg rounded-2xl p-6 mt-8 hover:shadow-2xl transition transform hover:scale-[1.02]">
          <h2 className="font-bold text-xl mb-4 text-indigo-700">Advanced Actions</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={() => handleAdvancedAction("Reset Lab Progress")}
              className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition font-semibold flex-1"
            >
              Reset Lab Progress
            </button>
            <button
              onClick={() => handleAdvancedAction("Clear Cached Labs")}
              className="bg-yellow-600 text-white px-6 py-3 rounded-xl hover:bg-yellow-700 transition font-semibold flex-1"
            >
              Clear Cached Labs
            </button>
            <button
              onClick={() => handleAdvancedAction("Download Lab Reports")}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition font-semibold flex-1"
            >
              Download Lab Reports
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

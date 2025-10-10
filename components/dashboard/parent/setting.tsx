"use client"
import { checkingUserRole } from "@/lib/user-authentication"
import LoadingScreen from "../loading-screen/loading-screen"
import { useEffect, useState } from "react"

export default function ParentSettings() {
  const [loadingControl, setLoading] = useState<boolean>(true)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md")
  const [cardStyle, setCardStyle] = useState<"rounded" | "sharp">("rounded")

  useEffect(() => {
    checkingUserRole()
    setLoading(false)
  }, [])

  if (loadingControl) return <LoadingScreen />

  const handleSave = () => {
    alert("Appearance settings saved! Implement persistence here.")
  }

  return (
    <div className="main-parent ml-[400px] pt-[50px] px-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-700">Appearance Settings</h1>
        <p className="text-gray-500 mt-1">Customize the dashboard look and feel</p>
      </div>

      {/* Appearance Form */}
      <div className="bg-white shadow-md rounded-xl p-8 max-w-3xl space-y-6">
        {/* Theme Selection */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as "light" | "dark")}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Font Size Selection */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Font Size</label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value as "sm" | "md" | "lg")}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </div>

        {/* Card Style Selection */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Card Style</label>
          <select
            value={cardStyle}
            onChange={(e) => setCardStyle(e.target.value as "rounded" | "sharp")}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="rounded">Rounded Cards</option>
            <option value="sharp">Sharp Cards</option>
          </select>
        </div>

        {/* Preview Box */}
        <div className={`p-6 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"} ${cardStyle === "rounded" ? "rounded-xl" : "rounded-none"} ${fontSize === "sm" ? "text-sm" : fontSize === "md" ? "text-base" : "text-lg"}`}>
          <p className="font-semibold">This is a preview box.</p>
          <p>The dashboard cards and text will reflect your appearance settings.</p>
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Save Appearance
          </button>
        </div>
      </div>
    </div>
  )
}

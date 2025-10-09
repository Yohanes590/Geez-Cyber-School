"use client"
import { useState, useEffect, useRef } from "react"
import LoadingScreen from "../loading-screen/loading-screen"
import { checkingUserRole } from "@/lib/user-authentication"
import { Send, User } from "lucide-react"

type Message = {
  id: number
  sender: "teacher" | "student"
  text: string
}

type Student = {
  id: number
  name: string
  lastMessage: string
}

export default function TeacherChatComponent() {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    checkingUserRole()
    setTimeout(() => setLoading(false), 300)

    // Mock data
    setStudents([
      { id: 1, name: "Abebe Tasew", lastMessage: "I completed the lab!" },
      { id: 2, name: "Demes Aragaw", lastMessage: "Can you check my SQL injection?" },
      { id: 3, name: "Bante Yergaw", lastMessage: "XSS lab is tricky..." },
    ])
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const selectStudent = (student: Student) => {
    setSelectedStudent(student)
    setMessages([
      { id: 1, sender: "student", text: "Hello, can you help me with Assignment 3?" },
      { id: 2, sender: "teacher", text: "Sure! What part are you stuck on?" },
    ])
  }

  const sendMessage = () => {
    if (!input.trim() || !selectedStudent) return
    const newMsg: Message = {
      id: messages.length + 1,
      sender: "teacher",
      text: input,
    }
    setMessages([...messages, newMsg])
    setInput("")
    setTimeout(() => scrollToBottom(), 100)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage()
  }

  if (loading) return <LoadingScreen />

  return (
    <div className="flex h-screen ml-[400px] pt-[70px] bg-gradient-to-br from-indigo-50 to-white">
      {/* Left Sidebar */}
      <aside className="w-[320px] bg-white border-r border-gray-200 shadow-md rounded-r-xl overflow-y-auto">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Students 💬</h2>
          <p className="text-sm text-gray-500">Select a student to chat</p>
        </div>
        <div>
          {students.map((student) => (
            <div
              key={student.id}
              onClick={() => selectStudent(student)}
              className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-indigo-50 transition ${
                selectedStudent?.id === student.id ? "bg-indigo-100" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                <User size={18} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{student.name}</h3>
                <p className="text-sm text-gray-500 truncate w-[200px]">{student.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col bg-white rounded-l-xl shadow-lg mx-6 mb-6 mt-2 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
          <h2 className="text-lg font-semibold">
            {selectedStudent ? selectedStudent.name : "Teacher Chat"}
          </h2>
          {selectedStudent && <span className="text-sm opacity-80">Online</span>}
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-3">
          {selectedStudent ? (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "teacher" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl shadow-sm ${
                    msg.sender === "teacher"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-10">
              👋 Select a student to start chatting.
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        {selectedStudent && (
          <div className="p-4 border-t bg-white flex items-center gap-3">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder={`Message ${selectedStudent.name}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={sendMessage}
              className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition"
            >
              <Send size={18} />
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

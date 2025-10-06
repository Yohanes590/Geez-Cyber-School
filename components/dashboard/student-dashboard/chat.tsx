"use client"

import { useState, useEffect, useRef } from "react"
import LoadingScreen from "../loading-screen/loading-screen"
import { checkingUserRole } from "@/lib/user-authentication"

type Message = {
  id: number
  sender: "me" | "other"
  content: string
  timestamp: string
}

type ChatUser = {
  id: number
  name: string
  lastMessage: string
}

export default function StudentChatSection() {
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([])
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    checkingUserRole()
    // Mock users
    setChatUsers([
      { id: 1, name: "Abebe Tasew", lastMessage: "I completed the lab!" },
      { id: 2, name: "Demes Aragaw", lastMessage: "Can you check my SQL injection?" },
      { id: 3, name: "Bante Yergaw", lastMessage: "XSS lab is tricky..." },
    ])
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const selectUser = (user: ChatUser) => {
    setSelectedUser(user)
    // Mock messages
    setMessages([
      { id: 1, sender: "other", content: "Hey, did you finish the lab?", timestamp: "10:15 AM" },
      { id: 2, sender: "me", content: "Almost done, will submit soon.", timestamp: "10:17 AM" },
      { id: 3, sender: "other", content: "Cool, let me know if you need help.", timestamp: "10:20 AM" },
    ])
  }

  const sendMessage = () => {
    if (!inputValue.trim()) return
    const newMsg: Message = {
      id: messages.length + 1,
      sender: "me",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages([...messages, newMsg])
    setInputValue("")
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <LoadingScreen />
      <div className="main-assignment ml-[400px] pt-[70px] px-6 h-[calc(100vh-70px)]">
        <h1 className="text-2xl font-semibold mb-6">Cyber Lab Chat 👋</h1>
        <div className="flex h-full shadow-lg rounded-xl overflow-hidden border border-gray-200">
          {/* Left panel: user list */}
          <div className="w-1/3 bg-gray-50 border-r border-gray-200 overflow-y-auto">
            {chatUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => selectUser(user)}
                className={`p-4 cursor-pointer hover:bg-gray-100 ${
                  selectedUser?.id === user.id ? "bg-gray-200" : ""
                }`}
              >
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
              </div>
            ))}
          </div>

          {/* Right panel: chat messages */}
          <div className="w-2/3 flex flex-col justify-between bg-white">
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      msg.sender === "me" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <span className="text-xs text-gray-500 block text-right mt-1">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input box */}
            {selectedUser && (
              <div className="p-4 border-t border-gray-200 flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder={`Message ${selectedUser.name}...`}
                />
                <button
                  onClick={sendMessage}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Send
                </button>
              </div>
            )}
            {!selectedUser && <p className="p-4 text-gray-500">Select a user to start chatting</p>}
          </div>
        </div>
      </div>
    </>
  )
}

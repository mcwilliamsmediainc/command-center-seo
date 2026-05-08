"use client"

import { useState } from "react"
import { Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export function SageChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hey! I'm Sage, your SEO strategist. What are we working on today?"
    }
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput("")
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm analyzing that for you. Let me pull up some insights from your client data..."
      }
      setMessages(prev => [...prev, aiMessage])
    }, 1000)
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-light-blue/30 bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-light-blue/30 p-4">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-navy to-slate-blue">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-green-500" />
        </div>
        <div>
          <h3 className="font-[var(--font-bebas)] text-lg tracking-wide text-navy">SAGE</h3>
          <p className="text-xs text-muted-foreground">SEO Assistant</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                message.role === "user"
                  ? "bg-navy text-white"
                  : "bg-off-white text-navy"
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-light-blue/30 p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Sage anything..."
            className="flex-1 border-light-blue/50 bg-off-white focus-visible:ring-navy"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button 
            onClick={handleSend}
            className="bg-light-blue text-navy hover:bg-light-blue/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

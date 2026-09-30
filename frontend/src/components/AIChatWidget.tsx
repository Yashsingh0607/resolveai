"use client";

import { useState } from "react";

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I am ResolveAI Copilot. How can I help you understand our autonomous ticket resolution engine?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");

    // Simulate RAG AI response
    setTimeout(() => {
      let reply = "ResolveAI connects to your Zendesk or Jira backlog, analyzes issues using vector search, and autonomously drafts or executes fixes with 94%+ accuracy.";
      if (userMsg.toLowerCase().includes("pricing")) {
        reply = "We offer a Free Starter tier, a $49/mo Professional tier, and custom Enterprise agreements.";
      } else if (userMsg.toLowerCase().includes("security")) {
        reply = "ResolveAI is SOC2 Type II compliant, encrypts data at rest, and supports enterprise SAML/Okta SSO.";
      }
      setMessages((prev) => [...prev, { role: "ai", text: reply }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-2xl flex items-center gap-3 transition-all hover:scale-105 border border-blue-400/30">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <span className="font-bold text-sm pr-1">Ask AI Assistant</span>
        </button>
      ) : (
        <div className="bg-slate-900 border border-slate-800 w-80 sm:w-96 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[480px] animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse"></div>
              <h3 className="text-sm font-bold text-white">ResolveAI Assistant (RAG Enabled)</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white text-lg">&times;</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                  m.role === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700/50"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              placeholder="Ask about features, pricing, architecture..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg text-xs font-semibold">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

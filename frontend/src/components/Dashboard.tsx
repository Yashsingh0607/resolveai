"use client";

import { useState } from "react";
import { initialTickets, Ticket } from "../lib/data";
import TicketModal from "./TicketModal";

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Metrics calculations
  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === "Open").length;
  const resolvedTickets = tickets.filter((t) => t.status === "Resolved").length;
  const avgAiConfidence = Math.round(
    tickets.reduce((acc, t) => acc + t.aiConfidence, 0) / totalTickets
  );

  const handleResolveTicket = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "Resolved" } : t))
    );
  };

  const filteredTickets = tickets.filter((t) => {
    const matchesStatus = filterStatus === "All" || t.status === filterStatus;
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Nav Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-500/30">
                R
              </div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                ResolveAI Engine
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Autonomous AI Support Agent & Service Resolution Center
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1.5 rounded-full">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              AI Agent Active
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Tickets</p>
            <p className="text-3xl font-extrabold text-slate-100 mt-2">{totalTickets}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Open Tickets</p>
            <p className="text-3xl font-extrabold text-amber-400 mt-2">{openTickets}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Resolved Tickets</p>
            <p className="text-3xl font-extrabold text-emerald-400 mt-2">{resolvedTickets}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Avg AI Precision</p>
            <p className="text-3xl font-extrabold text-blue-400 mt-2">{avgAiConfidence}%</p>
          </div>
        </div>

        {/* Control Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 border border-slate-800 rounded-xl">
          <input
            type="text"
            placeholder="Search tickets by ID, title, customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            {["All", "Open", "In Progress", "Resolved"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  filterStatus === status
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}>
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs font-semibold uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Ticket ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">AI Score</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-blue-400">{ticket.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-200">{ticket.customer}</td>
                    <td className="px-6 py-4 max-w-xs truncate">{ticket.title}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        ticket.priority === "Urgent" ? "bg-red-950 text-red-400 border border-red-900" :
                        ticket.priority === "High" ? "bg-amber-950 text-amber-400 border border-amber-900" :
                        "bg-slate-800 text-slate-400"
                      }`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        ticket.status === "Resolved" ? "bg-emerald-950 text-emerald-400 border border-emerald-900" :
                        ticket.status === "In Progress" ? "bg-blue-950 text-blue-400 border border-blue-900" :
                        "bg-amber-950 text-amber-400 border border-amber-900"
                      }`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-200">{ticket.aiConfidence}%</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-200 rounded-lg transition-all">
                        View & Resolve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Ticket Modal */}
      <TicketModal
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
        onResolve={handleResolveTicket}
      />
    </div>
  );
}

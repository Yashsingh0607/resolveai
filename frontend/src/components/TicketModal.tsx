"use client";

import { useState } from "react";
import { Ticket } from "../lib/data";

interface Props {
  ticket: Ticket | null;
  onClose: () => void;
  onResolve: (id: string) => void;
}

export default function TicketModal({ ticket, onClose, onResolve }: Props) {
  const [isResolving, setIsResolving] = useState(false);

  if (!ticket) return null;

  const handleAutoResolve = () => {
    setIsResolving(true);
    setTimeout(() => {
      onResolve(ticket.id);
      setIsResolving(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold text-blue-400 bg-blue-950/60 border border-blue-800/50 px-2.5 py-1 rounded-full">
                {ticket.id}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                {ticket.category}
              </span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                ticket.priority === 'Urgent' ? 'bg-red-950 text-red-400 border border-red-800/50' :
                ticket.priority === 'High' ? 'bg-amber-950 text-amber-400 border border-amber-800/50' :
                'bg-slate-800 text-slate-400'
              }`}>
                {ticket.priority} Priority
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-100">{ticket.title}</h2>
            <p className="text-xs text-slate-400 mt-1">
              Submitted by <span className="text-slate-200 font-medium">{ticket.customer}</span> ({ticket.email})
            </p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 text-2xl leading-none">&times;</button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Customer Query */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Issue Description</h3>
            <p className="text-sm text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
              {ticket.description}
            </p>
          </div>

          {/* AI Suggested Resolution */}
          <div className="bg-gradient-to-br from-blue-950/40 to-indigo-950/40 border border-blue-900/40 rounded-xl p-5">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                </span>
                <h3 className="text-sm font-bold text-blue-300">ResolveAI Copilot Suggestion</h3>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/50 px-2 py-0.5 rounded">
                {ticket.aiConfidence}% AI Match
              </span>
            </div>
            <div className="text-sm text-slate-300 whitespace-pre-line leading-relaxed font-mono text-xs bg-slate-950/50 p-3.5 rounded-lg border border-blue-900/30">
              {ticket.aiSuggestedSolution}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 flex justify-end gap-3 bg-slate-950/40">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors">
            Close
          </button>
          {ticket.status !== "Resolved" && (
            <button
              onClick={handleAutoResolve}
              disabled={isResolving}
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2 disabled:opacity-50">
              {isResolving ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Applying Resolution...
                </>
              ) : (
                "Apply AI Resolution & Close Ticket"
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import AIChatWidget from "./AIChatWidget";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Navigation */}
      <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-500/30">
            R
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">ResolveAI</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block">Features</a>
          <a href="#pricing" className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block">Pricing</a>
          <Link href="/dashboard" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold shadow-lg shadow-blue-600/20 transition-all">
            Launch Dashboard &rarr;
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-24 max-w-5xl mx-auto text-center space-y-8">
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
          Autonomous AI Ticket Resolution for <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Enterprise Engineering Teams</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Resolve customer backlogs 10x faster using semantic vector search, autonomous RAG diagnosis, and one-click action workflows.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/dashboard" className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-xl shadow-blue-600/30 transition-all text-center">
            Open Live Demo Dashboard
          </Link>
          <a href="#pricing" className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl font-semibold transition-all text-center">
            View Pricing Tiers
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 max-w-6xl mx-auto border-t border-slate-900">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-extrabold text-white">Engineered for Rapid Ticket Velocity</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">Everything engineering teams need to streamline customer support operations and eliminate backlogs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-lg">??</div>
            <h3 className="text-lg font-bold text-white">Semantic Vector Search</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Instantly retrieve historical resolutions, system logs, and documentation using deep RAG embeddings.</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-lg">??</div>
            <h3 className="text-lg font-bold text-white">Autonomous AI Copilot</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Receive automated step-by-step resolution steps with confidence scoring directly in your ticket drawer.</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-lg">?</div>
            <h3 className="text-lg font-bold text-white">One-Click Workflows</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Execute AI-driven actions to close tickets, update state, and trigger webhooks instantly across your stack.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-20 max-w-6xl mx-auto border-t border-slate-900">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-extrabold text-white">Transparent Enterprise Pricing</h2>
          <p className="text-sm text-slate-400">Choose the ideal tier for your support velocity and infrastructure scale.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Starter */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Starter</h3>
              <p className="text-xs text-slate-400 mt-1">For small dev teams and MVPs.</p>
              <div className="my-6">
                <span className="text-4xl font-black text-white">$0</span>
                <span className="text-slate-400 text-xs"> / month</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2">&checkmark; Up to 250 AI tickets/mo</li>
                <li className="flex items-center gap-2">&checkmark; Basic RAG integration</li>
                <li className="flex items-center gap-2">&checkmark; Community Support</li>
              </ul>
            </div>
            <Link href="/dashboard" className="mt-8 w-full py-3 bg-slate-800 hover:bg-slate-700 text-center rounded-xl text-sm font-bold text-slate-200 transition-colors">
              Get Started Free
            </Link>
          </div>

          {/* Professional */}
          <div className="bg-gradient-to-b from-blue-950/40 to-slate-900 border-2 border-blue-500/80 rounded-2xl p-8 flex flex-col justify-between relative shadow-2xl shadow-blue-950">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
              Most Popular
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Professional</h3>
              <p className="text-xs text-slate-400 mt-1">For scaling SaaS companies.</p>
              <div className="my-6">
                <span className="text-4xl font-black text-white">$49</span>
                <span className="text-slate-400 text-xs"> / month</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2">&checkmark; Unlimited AI Resolutions</li>
                <li className="flex items-center gap-2">&checkmark; Advanced Vector Search</li>
                <li className="flex items-center gap-2">&checkmark; Custom Webhook APIs</li>
                <li className="flex items-center gap-2">&checkmark; Priority 24/7 Support</li>
              </ul>
            </div>
            <Link href="/dashboard" className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-500 text-center rounded-xl text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all">
              Start Free Trial
            </Link>
          </div>

          {/* Enterprise */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Enterprise</h3>
              <p className="text-xs text-slate-400 mt-1">For large regulated organizations.</p>
              <div className="my-6">
                <span className="text-4xl font-black text-white">Custom</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2">&checkmark; Dedicated VPC / On-Premise</li>
                <li className="flex items-center gap-2">&checkmark; SAML / Okta Enterprise SSO</li>
                <li className="flex items-center gap-2">&checkmark; Custom Fine-Tuned LLMs</li>
                <li className="flex items-center gap-2">&checkmark; Dedicated Solutions Architect</li>
              </ul>
            </div>
            <Link href="/dashboard" className="mt-8 w-full py-3 bg-slate-800 hover:bg-slate-700 text-center rounded-xl text-sm font-bold text-slate-200 transition-colors">
              Contact Sales
            </Link>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 px-6 text-center text-xs text-slate-500">
        &copy; 2026 ResolveAI Engine. All rights reserved.
      </footer>

      {/* AI Chat Assistant Widget */}
      <AIChatWidget />
    </div>
  );
}

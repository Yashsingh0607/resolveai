# ResolveAI - AI Support & Ticket Resolution Engine

## Overview
**ResolveAI** is an enterprise-grade AI-powered support and ticket resolution platform built to automate customer service backlogs. It combines semantic vector search, RAG-powered automated diagnosis, and instant action workflows to empower engineering and support teams to resolve issues faster.

---

## Key Features
- **Landing Page & Public SaaS Wrapper**: Clean marketing interface featuring core value propositions and transparent pricing tiers.
- **RAG-Powered AI Chat Assistant**: Interactive floating assistant directly on the landing page to help visitors query product features, workflows, and FAQs.
- **Interactive Ticket Operations Dashboard**: Real-time management of open, in-progress, and resolved service tickets with key performance metrics (Total Tickets, Open Queue, Resolved Count, AI Precision Score).
- **AI Copilot Resolution Drawer**: Deep inspection modal providing confidence scoring and step-by-step automated resolution guidelines.
- **State-Driven Workflow**: One-click AI ticket resolution updating live UI state instantly.

---

## Architecture & System Design
User / Visitor ──> Landing Page & AI Chat ──> ResolveAI Dashboard ──> RAG Copilot ──> Ticket Resolved

## Technology Stack
- **Frontend Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Client Components & React Hooks

---

## Business Model & Pricing
- **Starter ($0/mo)**: Up to 250 AI tickets/mo, basic RAG integration, community support.
- **Professional ($49/mo)**: Unlimited AI resolutions, advanced vector search, custom webhooks, 24/7 support.
- **Enterprise (Custom)**: Dedicated VPC/On-premise, SAML/Okta SSO, custom fine-tuned LLMs, dedicated solutions architect.

---

## Getting Started Locally

### Prerequisites
- Node.js (v18.x or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <your-github-repo-url>
   cd resolveai
   
2. **Install dependencies**:

   ```Bash
   npm install
  
3. **Run the development server**:
   ```Bash
   npm run dev
Open in Browser:

Navigate to http://localhost:3000 to view the landing page and dashboard.

export interface Ticket {
  id: string;
  customer: string;
  email: string;
  title: string;
  category: "Billing" | "Technical" | "Account" | "Bug";
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Open" | "In Progress" | "Resolved";
  createdAt: string;
  aiConfidence: number;
  aiSuggestedSolution: string;
  description: string;
}

export const initialTickets: Ticket[] = [
  {
    id: "TIC-101",
    customer: "Sarah Jenkins",
    email: "sarah.j@example.com",
    title: "Unable to export monthly analytics PDF",
    category: "Technical",
    priority: "High",
    status: "Open",
    createdAt: "10 mins ago",
    aiConfidence: 94,
    description: "Every time I click 'Export Report' on the monthly analytics page, it throws a 504 Gateway Timeout error.",
    aiSuggestedSolution: "1. Clear browser cache for PDF renderer module.\n2. Verify database connection pool timeout limit in `config/analytics.env`.\n3. Re-generate cache via backend command: `npm run refresh-cache`."
  },
  {
    id: "TIC-102",
    customer: "Alex Rivera",
    email: "arivera@techcorp.io",
    title: "Double charged for Pro subscription renewal",
    category: "Billing",
    priority: "Urgent",
    status: "In Progress",
    createdAt: "25 mins ago",
    aiConfidence: 98,
    description: "My credit card was billed twice ($49.00 x 2) on Sept 30th for the annual plan renewal.",
    aiSuggestedSolution: "1. Cross-reference transaction IDs TX-8821 and TX-8822 in Stripe Dashboard.\n2. Issue full refund for duplicate charge TX-8822.\n3. Send automated receipt email confirming the $49 refund credit."
  },
  {
    id: "TIC-103",
    customer: "Elena Rostova",
    email: "elena.r@designhub.org",
    title: "OAuth login failing with SSO provider",
    category: "Account",
    priority: "Medium",
    status: "Open",
    createdAt: "1 hour ago",
    aiConfidence: 89,
    description: "Users on our Okta SSO tenant receive an 'Invalid Redirect URI' page when attempting sign-in.",
    aiSuggestedSolution: "1. Ensure callback URL `https://app.resolveai.io/api/auth/callback/okta` is whitelisted in Okta Admin Console.\n2. Verify SAML/OAuth client secrets in ResolveAI Settings."
  },
  {
    id: "TIC-104",
    customer: "Marcus Vance",
    email: "m.vance@startup.co",
    title: "Webhook notifications dropping payload data",
    category: "Bug",
    priority: "High",
    status: "Open",
    createdAt: "2 hours ago",
    aiConfidence: 91,
    description: "Webhooks triggered on 'ticket.resolved' event are missing customer object fields.",
    aiSuggestedSolution: "1. Update payload schema serializer in `src/services/webhook.ts`.\n2. Add test payload validator before dispatching events."
  },
  {
    id: "TIC-105",
    customer: "David Chen",
    email: "dchen@globalbiz.net",
    title: "Request for custom API rate limit increase",
    category: "Account",
    priority: "Low",
    status: "Resolved",
    createdAt: "1 day ago",
    aiConfidence: 96,
    description: "We are scaling our integration and need 10,000 requests/min instead of 1,000.",
    aiSuggestedSolution: "1. Tier upgraded to Enterprise Tier 2.\n2. Updated Redis rate limiter key `rate_limit:tenant_4401` to 10000 req/min."
  }
];

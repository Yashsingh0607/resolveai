import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY", "")
client = OpenAI(api_key=api_key) if api_key and api_key != "your-actual-api-key-here" else None

def analyze_ticket_with_ai(subject: str, description: str, category: str = "General", kb_context: str = "") -> dict:
    """
    Analyzes a customer support ticket with optional RAG Knowledge Base context.
    """
    prompt = f"""
    You are an enterprise AI customer-support analysis assistant.
    Analyze the following support ticket using the provided Knowledge Base articles if relevant.

    TICKET DETAILS:
    Subject: {subject}
    Category: {category}
    Description: {description}

    KNOWLEDGE BASE CONTEXT:
    {kb_context if kb_context else "No relevant knowledge base articles found."}

    Return ONLY a valid JSON object with exact keys:
    - "summary": (A concise 1-2 sentence summary of the issue)
    - "root_cause": (The technical or operational reason for this issue)
    - "recommended_action": (Step-by-step resolution instructions for the support agent)
    - "escalation_required": (true or false boolean)
    - "suggested_response": (A professional, polite draft response to send to the customer)
    """

    if not client:
        return {
            "summary": f"Customer reports an issue regarding '{subject}'.",
            "root_cause": "System event processing failure or synchronization delay.",
            "recommended_action": f"Refer to KB context: '{kb_context[:100]}...' if available, otherwise check logs." if kb_context else "Check transaction history, verify webhook logs, and manually resync if needed.",
            "escalation_required": False,
            "suggested_response": f"Hi, thank you for contacting support regarding '{subject}'. We are reviewing your issue according to our standard protocols and will update you shortly."
        }

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful customer support ticket analyzer that outputs strict JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2,
            response_format={"type": "json_object"}
        )
        content = response.choices[0].message.content
        return json.loads(content)
    except Exception as e:
        print(f"AI Service Error: {e}")
        return {
            "summary": f"Issue regarding {subject}.",
            "root_cause": "Unable to automatically determine cause via AI.",
            "recommended_action": "Investigate ticket manually.",
            "escalation_required": True,
            "suggested_response": "Hello, we have received your request and our support team is currently investigating."
        }
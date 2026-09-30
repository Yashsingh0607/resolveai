from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas, auth
from app.services import ai_service

router = APIRouter(prefix="/tickets", tags=["Tickets"])

@router.post("/", response_model=schemas.TicketResponse, status_code=status.HTTP_201_CREATED)
def create_ticket(
    ticket: schemas.TicketCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    new_ticket = models.Ticket(
        customer_name=ticket.customer_name,
        subject=ticket.subject,
        description=ticket.description,
        priority=ticket.priority or "Medium",
        category=ticket.category or "General",
        created_by=current_user.id
    )
    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    return new_ticket

@router.get("/", response_model=List[schemas.TicketResponse])
def get_tickets(
    status_filter: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    query = db.query(models.Ticket)
    if status_filter:
        query = query.filter(models.Ticket.status == status_filter)
    return query.order_by(models.Ticket.created_at.desc()).all()

@router.get("/{ticket_id}", response_model=schemas.TicketResponse)
def get_ticket_detail(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    ticket = db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket

@router.post("/{ticket_id}/analyze", response_model=schemas.AIAnalysisResponse)
def analyze_ticket(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    ticket = db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    # RAG Retrieval: Search relevant KB articles matching ticket category or subject
    kb_articles = db.query(models.KnowledgeArticle).filter(
        (models.KnowledgeArticle.category == ticket.category) |
        (models.KnowledgeArticle.title.ilike(f"%{ticket.category}%"))
    ).all()

    kb_context = "\n".join([f"[{art.title}]: {art.content}" for art in kb_articles])

    # AI Analysis with KB context
    ai_result = ai_service.analyze_ticket_with_ai(
        subject=ticket.subject,
        description=ticket.description,
        category=ticket.category,
        kb_context=kb_context
    )

    existing_analysis = db.query(models.AIAnalysis).filter(models.AIAnalysis.ticket_id == ticket_id).first()

    if existing_analysis:
        existing_analysis.summary = ai_result.get("summary")
        existing_analysis.root_cause = ai_result.get("root_cause")
        existing_analysis.recommended_action = ai_result.get("recommended_action")
        existing_analysis.escalation_required = ai_result.get("escalation_required", False)
        existing_analysis.suggested_response = ai_result.get("suggested_response")
        db.commit()
        db.refresh(existing_analysis)
        return existing_analysis

    new_analysis = models.AIAnalysis(
        ticket_id=ticket.id,
        summary=ai_result.get("summary"),
        root_cause=ai_result.get("root_cause"),
        recommended_action=ai_result.get("recommended_action"),
        escalation_required=ai_result.get("escalation_required", False),
        suggested_response=ai_result.get("suggested_response")
    )
    db.add(new_analysis)
    db.commit()
    db.refresh(new_analysis)
    return new_analysis
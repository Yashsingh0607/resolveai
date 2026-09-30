from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas, auth

router = APIRouter(prefix="/knowledge", tags=["Knowledge Base"])

@router.post("/", response_model=schemas.ArticleResponse, status_code=status.HTTP_201_CREATED)
def create_article(
    article: schemas.ArticleCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    new_article = models.KnowledgeArticle(
        title=article.title,
        category=article.category,
        content=article.content
    )
    db.add(new_article)
    db.commit()
    db.refresh(new_article)
    return new_article

@router.get("/", response_model=List[schemas.ArticleResponse])
def get_articles(
    search: Optional[str] = None,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.KnowledgeArticle)
    if category:
        query = query.filter(models.KnowledgeArticle.category == category)
    if search:
        query = query.filter(
            (models.KnowledgeArticle.title.ilike(f"%{search}%")) |
            (models.KnowledgeArticle.content.ilike(f"%{search}%"))
        )
    return query.order_by(models.KnowledgeArticle.created_at.desc()).all()

@router.get("/{article_id}", response_model=schemas.ArticleResponse)
def get_article_detail(
    article_id: int,
    db: Session = Depends(get_db)
):
    article = db.query(models.KnowledgeArticle).filter(models.KnowledgeArticle.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article
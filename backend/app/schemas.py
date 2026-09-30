from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr

# --- User Schemas ---
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True

# --- Token Schemas ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# --- Ticket Schemas ---
class TicketBase(BaseModel):
    customer_name: str
    subject: str
    description: str
    priority: Optional[str] = "Medium"
    category: Optional[str] = "General"

class TicketCreate(TicketBase):
    pass

class TicketUpdate(BaseModel):
    status: Optional[str] = None
    priority: Optional[str] = None
    category: Optional[str] = None

class TicketResponse(TicketBase):
    id: int
    status: str
    created_by: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- AI Analysis Schemas ---
class AIAnalysisResponse(BaseModel):
    id: int
    ticket_id: int
    summary: Optional[str] = None
    root_cause: Optional[str] = None
    recommended_action: Optional[str] = None
    escalation_required: bool = False
    suggested_response: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# --- Knowledge Base Schemas ---
class ArticleBase(BaseModel):
    title: str
    category: str
    content: str

class ArticleCreate(ArticleBase):
    pass

class ArticleResponse(ArticleBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
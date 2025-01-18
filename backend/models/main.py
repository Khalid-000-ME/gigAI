import os
import json
from fastapi import FastAPI, HTTPException, Depends, Body
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Enum, ForeignKey, JSON
from sqlalchemy.orm import sessionmaker, relationship, Session
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from dotenv import load_dotenv
import subprocess
from pymongo import MongoClient
from typing import List


load_dotenv()

origins = [
    "http://localhost:3000", 
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# PostgreSQL Connection Setup using SQLAlchemy
DATABASE_URL = os.getenv('DB_URL')
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# MongoDB Connection
mongo_client = MongoClient("mongodb://localhost:27017/")
mongo_db = mongo_client["gig_ai_mongo"]
mongo_collection = mongo_db["example_collection"]

# PostgreSQL Model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    email = Column(String, nullable=False)
    resume_uri = Column(String, nullable=False)
    company = Column(String)
    role = Column(String)
    skills = Column(JSON)
    mongo_id = Column(String)
    

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
class Skills(BaseModel):
    skills: List[str]

class UserCreate(BaseModel):
    name: str
    email: str
    resume_uri: str
    company: str
    role: str
    skills: Skills
    

        
@app.post("/users/", response_model=UserCreate)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(name=user.name, email=user.email, resume_uri=user.resume_uri, company=user.company, role=user.role, skills=jsonable_encoder(user.skills))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

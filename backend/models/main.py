import os
import json
from flask import jsonify
from fastapi import FastAPI, HTTPException, Depends, Body, Query
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Time, Date, Column, Integer, String, DateTime, Enum, ForeignKey, JSON
from sqlalchemy.orm import sessionmaker, relationship, Session
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from dotenv import load_dotenv
import subprocess
from pymongo import MongoClient
from typing import List, Optional
from sqlalchemy import cast
from sqlalchemy.dialects.postgresql import JSONB
import uvicorn
import fastapi
import signal


load_dotenv()

origins = [
    "http://127.0.0.1:3000", 
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
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    resume_uri = Column(String, nullable=False)
    company = Column(String)
    role = Column(String)
    skills = Column(JSON)
    mongo_id = Column(String)
    password = Column(String)
    
class Gigs(Base):
    __tablename__ = "gigs"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, )
    title = Column(String, nullable=False)
    description = Column(String)
    prize_pool = Column(Integer)
    accepted_num = Column(Integer)
    tags = Column(JSONB)
    
class Submissions(Base):
    __tablename__ = "submissions"
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    gig_id = Column(Integer, ForeignKey('gigs.id'), nullable=False)
    title = Column(String)
    description = Column(String)
    submission_url = Column(String)
    submission_date = Column(Date)
    submission_time = Column(Time)
    status = Column(String)
    
    

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
    password: str
    
class GigCreate(BaseModel):
    title: str
    description: str
    prize_pool: int
    accepted_num: int
    tags: Skills
    
class SubmissionCreate(BaseModel):
    user_id: int
    gigs_id: int
    title: str
    description: str
    submission_url: str
    submission_date: str
    submission_time: str
    status: str
    

        
@app.post("/users/", response_model=UserCreate)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(name=user.name, email=user.email, resume_uri=user.resume_uri, company=user.company, role=user.role, skills=jsonable_encoder(user.skills), password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/")
def get_user(email: str = Query(None), id: str = Query(None), db: Session = Depends(get_db)):
    if email:
        user = db.query(User).filter_by(email=email).first()
    elif id:
        user = db.query(User).filter_by(id=int(id)).first()
    else:
        raise HTTPException(status_code=400, detail="Either 'email' or 'id' must be provided")
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.get("/users/login/")
def login_user(email:str=Query(...), password:str=Query(...), db: Session = Depends(get_db)):
    user = db.query(User).filter_by(email=email).first()
    if not user:
        return JSONResponse(
            content={"error": "Not found"}, status_code=404
        )
    if user.password == password:
        return JSONResponse(
            content={"message": "Login successful"}, status_code=200
        )
    return JSONResponse(
            content={"error": "Invalid credentials"}, status_code=400
        )

@app.post("/gigs/", response_model=GigCreate)
def create_gig(gig: GigCreate, db: Session = Depends(get_db)):
    # Check if the record already exists
    record = (
        db.query(Gigs)
        .filter(
            Gigs.title == gig.title,
            Gigs.description == gig.description,
            Gigs.prize_pool == gig.prize_pool,
            Gigs.accepted_num == gig.accepted_num,
            Gigs.tags == cast(jsonable_encoder(gig.tags), JSONB),
        )
        .first()
    )

    if record:
        return JSONResponse(
            content={"error": "Record already exists."}, status_code=400
        )

    # Create and add the new gig
    db_gig = Gigs(
        title=gig.title,
        description=gig.description,
        prize_pool=gig.prize_pool,
        accepted_num=gig.accepted_num,
        tags=jsonable_encoder(gig.tags),
    )
    db.add(db_gig)
    db.commit()
    db.refresh(db_gig)
    return db_gig


@app.get('/submissions/')
def get_submissions_by_gig_id(gig_id: int, db: Session=Depends(get_db)):
    data = db.query(Submissions).filter_by(gig_id=gig_id)
    return JSONResponse(jsonable_encoder(data), status_code=200)

@app.get('/submissions/')
def get_submissions_by_user_id(user_id: int, db: Session=Depends(get_db)):
    data = db.query(Submissions).filter_by(gig_id=user_id)
    return JSONResponse(jsonable_encoder(data), status_code=200)

@app.post('/submissions/', response_model=SubmissionCreate)
def post_submissions(submission: SubmissionCreate, db: Session=Depends(get_db)):
    
    record = (
        db.query(Submissions)
        .filter(
            Submissions.user_id == submission.user_id,
            Submissions.gig_id == submission.gig_id,
            Submissions.description == submission.description,
            Submissions.submission_url == submission.submission_url,
            Submissions.submission_date == submission.submission_date,
            Submissions.submission_time == submission.submission_time,
            Submissions.status == submission.status
        )
        .first()
    )

    if record:
        return JSONResponse(
            content={"error": "Record already exists."}, status_code=400
        )
    
    
    db_submission = Submissions(
        user_id=submission.user_id,
        gig_id=submission.gig_id,
        title=submission.title,
        description=submission.description,
        submission_url=submission.submission_url,
        submission_date=submission.submission_url,
        submission_time=submission.submission_time,
        status=submission.status
    )
    db.add(submission)
    db.commit()
    db.refresh(db_submission)
    return JSONResponse(db_submission, status_code=200)
    


@app.get("/gigs/")
def get_gigs(db: Session=Depends(get_db)):
    response = db.query(Gigs).all()
    return JSONResponse(jsonable_encoder(response), status_code=200)
    

def shutdown():
    os.kill(os.getpid(), signal.SIGTERM)
    return fastapi.Response(status_code=200, content='Server shutting down...')

@app.on_event('shutdown')
def on_shutdown():
    print('Server shutting down...')
    
app.add_api_route('/shutdown', shutdown, methods=['GET'])


Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

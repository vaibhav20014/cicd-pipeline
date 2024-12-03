from fastapi import FastAPI
from pydantic import BaseModel
from passlib.context import CryptContext
from sqlmodel import SQLModel, Field, Session, create_engine, select

app = FastAPI()

# Password hashing configuration
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Database connection settings (using SQLModel's connection string format)
DATABASE_URL = "mysql+mysqlconnector://sa:Admin@123@sql_server_container:3306/Testdb"

# Database connection setup
engine = create_engine(DATABASE_URL)

# Define the User model using SQLModel (this will map to your users table in MySQL)
class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    username: str
    email: str
    password_hash: str

# Create the database tables if they don't exist already
SQLModel.metadata.create_all(engine)

# User schema for requests (for validation purposes)
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

@app.post("/register")
async def register_user(user: UserCreate):
    hashed_password = pwd_context.hash(user.password)
    # Create a new user instance
    new_user = User(username=user.username, email=user.email, password_hash=hashed_password)

    # Create a session and insert the user into the database
    with Session(engine) as session:
        session.add(new_user)
        session.commit()
        return {"message": "User registered successfully"}

@app.post("/login")
async def login_user(email: str, password: str):
    with Session(engine) as session:
        # Query for the user by email
        statement = select(User).where(User.email == email)
        user = session.exec(statement).first()

        if user and pwd_context.verify(password, user.password_hash):
            return {"message": "Login successful"}
        return {"error": "Invalid credentials"}

@app.get("/")
async def root():
    return {"message": "FastAPI is running"}


from fastapi import FastAPI
from pydantic import BaseModel
from passlib.context import CryptContext
import mysql.connector

app = FastAPI()

# Password hashing configuration
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Database connection settings (hardcoded)
db_config = {
    "host": "sql_server_container",
    "port": 3306,
    "user": "sa",
    "password": "Admin@123",  # Replace with your actual root password
    "database": "Testdb"
}

# Database connection function
def get_database_connection():
    return mysql.connector.connect(**db_config)

# User schema for requests
class User(BaseModel):
    username: str
    email: str
    password: str

@app.post("/register")
async def register_user(user: User):
    hashed_password = pwd_context.hash(user.password)
    connection = get_database_connection()
    cursor = connection.cursor()

    try:
        query = "INSERT INTO users (username, email, password_hash) VALUES (%s, %s, %s)"
        cursor.execute(query, (user.username, user.email, hashed_password))
        connection.commit()
        return {"message": "User registered successfully"}
    except Exception as e:
        return {"error": str(e)}
    finally:
        cursor.close()
        connection.close()

@app.post("/login")
async def login_user(email: str, password: str):
    connection = get_database_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        query = "SELECT * FROM users WHERE email = %s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()
        if user and pwd_context.verify(password, user["password_hash"]):
            return {"message": "Login successful"}
        return {"error": "Invalid credentials"}
    except Exception as e:
        return {"error": str(e)}
    finally:
        cursor.close()
        connection.close()

@app.get("/")
async def root():
    return {"message": "FastAPI is running"}

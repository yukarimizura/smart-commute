from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
import pymysql
import hashlib

router = APIRouter(prefix="/api/auth", tags=["Auth"])

# Koneksi ke MySQL XAMPP
def get_db_connection():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="",
        database="smart_commute",
        cursorclass=pymysql.cursors.DictCursor
    )

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()

class RegisterRequest(BaseModel):
    full_name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/register")
def register_user(req: RegisterRequest):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            # Cek apakah email sudah terdaftar
            cursor.execute("SELECT id FROM users WHERE email = %s", (req.email,))
            if cursor.fetchone():
                raise HTTPException(status_code=400, detail="Email sudah terdaftar.")

            pwd_hashed = hash_password(req.password)
            sql = "INSERT INTO users (full_name, email, password_hash) VALUES (%s, %s, %s)"
            cursor.execute(sql, (req.full_name, req.email, pwd_hashed))
            conn.commit()
            return {"status": "success", "message": "Pendaftaran berhasil, silakan login."}
    finally:
        conn.close()

@router.post("/login")
def login_user(req: LoginRequest):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT id, full_name, email, password_hash FROM users WHERE email = %s", (req.email,))
            user = cursor.fetchone()
            if not user or user["password_hash"] != hash_password(req.password):
                raise HTTPException(status_code=401, detail="Email atau password salah.")

            return {
                "status": "success",
                "user": {
                    "id": user["id"],
                    "full_name": user["full_name"],
                    "email": user["email"]
                }
            }
    finally:
        conn.close()
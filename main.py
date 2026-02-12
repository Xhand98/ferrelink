from fastapi import FastAPI
from db.db import DBM

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/health")
def read_root():
    return {"status": 200}


@app.post("/tablas/crear")
def create_item():
    db = DBM()
    return db.create_table()
from fastapi import FastAPI
from app.api import routes
import uvicorn

app = FastAPI(title="Nestory")

app.include_router(routes.router)

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)

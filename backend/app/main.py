import uvicorn
from fastapi import FastAPI

from app.api import person, tree, health
from app.middlewares import add_exception_handlers

app = FastAPI(title="Nestory")

add_exception_handlers(app)

app.include_router(person.router)
app.include_router(tree.router)
app.include_router(health.router)

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)

from fastapi import Request, FastAPI
from fastapi.responses import JSONResponse
from app.core.exceptions import DatabaseConnectionError, DatabaseOperationError


async def custom_exception_handler(request: Request, exc: DatabaseConnectionError):
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})


async def operation_exception_handler(request: Request, exc: DatabaseOperationError):
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})


def add_exception_handlers(app: FastAPI):
    app.add_exception_handler(DatabaseConnectionError, custom_exception_handler)
    app.add_exception_handler(DatabaseOperationError, operation_exception_handler)

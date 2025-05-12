from fastapi import HTTPException, status


class DatabaseConnectionError(HTTPException):
    def __init__(self, detail="Database connection failed"):
        super().__init__(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=detail)


class DatabaseOperationError(HTTPException):
    def __init__(self, detail="Database operation failed"):
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=detail
        )

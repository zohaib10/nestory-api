# Backend Dockerfile

FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Run migrations and then start the server
CMD pwd && ls && alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Makefile
REV_MSG ?= "auto migration"

migrate:
	alembic revision --autogenerate -m "$(REV_MSG)"

upgrade:
	alembic upgrade head

downgrade:
	alembic downgrade -1

format:
	black .
	isort .
	ruff format .

lint:
	ruff check . --fix

start:
	@echo "🚀 Starting Docker containers..."
	docker-compose up -d
	@echo "✅ Containers are up!"
	@echo "🌐 Starting FastAPI server..."
	uvicorn app.main:app --reload

stop:
	@echo "🛑 Stopping Docker containers..."
	docker-compose down

logs:
	@echo "📜 Showing logs..."
	docker-compose logs -f

restart: stop start

.PHONY: migrate upgrade downgrade format lint start stop logs restart

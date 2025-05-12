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
	@echo "🚀 Starting Nestory..."
	docker-compose up -d

stop:
	@echo "🛑 Stopping Nestory..."
	docker-compose down

logs:
	@echo "📜 Showing logs..."
	docker-compose logs -f

restart:
	@echo "🔄 Restarting Docker containers..."
	docker-compose down
	docker-compose up -d --build

.PHONY: migrate upgrade downgrade format lint start stop logs restart

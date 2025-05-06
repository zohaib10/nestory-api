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

# Makefile
REV_MSG ?= "auto migration"

migrate:
	alembic revision --autogenerate -m "$(REV_MSG)"

upgrade:
	alembic upgrade head

downgrade:
	alembic downgrade -1

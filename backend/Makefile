.PHONY: help run dev test lint format clean contract-test

PYTHON ?= python
PORT ?= 8000

help:
	@echo "Kannada Heritage AI - Epigraphy Backend Commands:"
	@echo "  make run           - Run production uvicorn server"
	@echo "  make dev           - Run local development server with auto-reload"
	@echo "  make test          - Run full pytest test suite (67+ tests)"
	@echo "  make contract-test - Run JSON Schema contract tests"
	@echo "  make lint          - Run ruff linter and mypy type checker"
	@echo "  make format        - Automatically format code with ruff"
	@echo "  make clean         - Remove temporary files, caches, and uploaded rubbings"

run:
	$(PYTHON) -m uvicorn backend.app.main:app --host 0.0.0.0 --port $(PORT)

dev:
	$(PYTHON) -m uvicorn backend.app.main:app --reload --host 127.0.0.1 --port $(PORT)

test:
	$(PYTHON) -m pytest backend/tests/ -v

contract-test:
	$(PYTHON) -m pytest backend/tests/test_contracts.py -v

lint:
	$(PYTHON) -m ruff check backend/
	$(PYTHON) -m mypy backend/app

format:
	$(PYTHON) -m ruff format backend/
	$(PYTHON) -m ruff check --fix backend/

clean:
	@powershell -Command "Get-ChildItem -Path . -Recurse -Include '__pycache__', '.pytest_cache', '.mypy_cache', '.ruff_cache' | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue"
	@powershell -Command "Get-ChildItem -Path backend/storage/uploads -Filter 'job-*' -ErrorAction SilentlyContinue | Remove-Item -Force"
	@powershell -Command "Get-ChildItem -Path backend/storage/jobs -Filter 'job-*' -ErrorAction SilentlyContinue | Remove-Item -Force"
	@echo "Cleaned pycache, test caches, and temporary uploads."

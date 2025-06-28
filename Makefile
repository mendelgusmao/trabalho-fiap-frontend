start: build-backend build-frontend
	docker compose up -d

build-backend:
	docker build -t leilao-fiap-backend ./backend

build-frontend:
	docker build -t leilao-fiap-frontend ./frontend

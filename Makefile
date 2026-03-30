.PHONY: build run docker-up

build:
go build -o bin/rag main.go

run:
go run main.go

docker-up:
docker compose up --build

tidy:
go mod tidy


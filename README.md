# 🧠 Go LLM RAG Pipeline

> Production-ready Retrieval-Augmented Generation (RAG) service built in Go with a React frontend.

![Go](https://img.shields.io/badge/Go-1.23-00ADD8?style=flat&logo=go)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![Fiber](https://img.shields.io/badge/Fiber-v2-00ACD7?style=flat)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=flat&logo=docker)

## ✨ Features

- ⚡ High-performance REST API built with [Fiber](https://gofiber.io/)
- 🤖 RAG-based question answering with simulated vector search
- 💬 React + TypeScript chat interface
- 🐳 Fully Dockerized with docker-compose
- 🔌 gRPC-ready architecture
- 🛡️ CORS, recovery middleware, structured logging
- 🚀 Graceful shutdown

## 🏗️ Architecture
```
┌─────────────────┐         ┌─────────────────────┐
│   React Frontend │ ──────▶ │   Go REST API        │
│   (Vite + TS)   │ ◀────── │   (Fiber v2)         │
└─────────────────┘         ├─────────────────────┤
                             │   RAG Engine         │
                             │   Vector Search      │
                             │   LLM Simulation     │
                             └─────────────────────┘
```

## 🚀 Quick Start

### Local Development
```bash
# Start backend
go run main.go

# Start frontend (new terminal)
cd frontend
npm install
npm run dev
```

Backend: `http://localhost:8080`  
Frontend: `http://localhost:5173`

### Docker
```bash
make docker-up
```

## 📡 API Endpoints

| Method | Endpoint  | Description |
|--------|-----------|-------------|
| GET    | `/`       | Health check |
| GET    | `/health` | Server status |
| POST   | `/ask`    | Ask a question |

### Example Request
```bash
curl -X POST http://localhost:8080/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is Go?"}'
```

### Example Response
```json
{
  "answer": "Go — это компилируемый язык программирования от Google. Отлично подходит для серверов и микросервисов.",
  "sources": ["doc1.pdf", "doc2.pdf"]
}
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Go 1.23, Fiber v2 |
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS v4 |
| Protocol | REST, gRPC-ready |
| DevOps | Docker, Docker Compose |
| CI/CD | GitHub Actions |

## 📁 Project Structure
```
go-llm-rag-pipeline/
├── main.go              # Entry point, REST API
├── frontend/            # React + TypeScript UI
│   ├── src/
│   │   ├── App.tsx      # Main chat component
│   │   └── index.css    # Global styles
│   └── package.json
├── Dockerfile           # Container config
├── docker-compose.yml   # Multi-service setup
└── Makefile             # Dev commands
```

## 🔧 Make Commands
```bash
make run        # Run backend locally
make build      # Build binary
make docker-up  # Start with Docker
```

## 📄 License

MIT License — feel free to use this project for learning or as a portfolio piece.

---

Built with ❤️ to demonstrate production-ready Go backend skills.
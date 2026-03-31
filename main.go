package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

type AskRequest struct {
	Question string `json:"question"`
}

type AskResponse struct {
	Answer  string   `json:"answer"`
	Sources []string `json:"sources"`
}

func main() {
	app := fiber.New()
	app.Use(recover.New())
	app.Use(logger.New())
	app.Use(cors.New())

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Go LLM RAG Pipeline is running",
			"status":  "ok",
		})
	})

	app.Get("/health", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})

	app.Post("/ask", func(c *fiber.Ctx) error {
		req := new(AskRequest)
		if err := c.BodyParser(req); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
		}

		// Симуляция RAG ответа
		answer := simulateRAG(req.Question)

		return c.JSON(AskResponse{
			Answer:  answer,
			Sources: []string{"doc1.pdf", "doc2.pdf"},
		})
	})

	go func() {
		if err := app.Listen(":8080"); err != nil {
			log.Fatal(err)
		}
	}()

	log.Println("Server started on :8080")

	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGINT, syscall.SIGTERM)
	<-sig

	log.Println("Shutting down...")
}

func simulateRAG(question string) string {
	responses := map[string]string{
		"go":     "Go — это компилируемый язык программирования от Google. Отлично подходит для серверов и микросервисов.",
		"rag":    "RAG (Retrieval-Augmented Generation) — это техника, которая улучшает ответы LLM с помощью поиска релевантных документов.",
		"grpc":   "gRPC — это высокопроизводительный RPC-фреймворк от Google, использующий Protocol Buffers.",
		"docker": "Docker — платформа для контейнеризации приложений.",
	}

	for key, response := range responses {
		if containsIgnoreCase(question, key) {
			return response
		}
	}

	return "Это симуляция RAG-ответа. В реальном проекте здесь был бы поиск по векторной базе данных и вызов LLM модели."
}

func containsIgnoreCase(s, substr string) bool {
	return len(s) >= len(substr) &&
		(s == substr ||
			len(s) > 0 && containsIgnoreCase(s[1:], substr) ||
			equalIgnoreCase(s[:len(substr)], substr))
}

func equalIgnoreCase(a, b string) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		ca, cb := a[i], b[i]
		if ca >= 'A' && ca <= 'Z' {
			ca += 32
		}
		if cb >= 'A' && cb <= 'Z' {
			cb += 32
		}
		if ca != cb {
			return false
		}
	}
	return true
}

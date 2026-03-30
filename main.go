package main

import (
"log"
"os"
"os/signal"
"syscall"

"github.com/gofiber/fiber/v2"
"github.com/gofiber/fiber/v2/middleware/logger"
"github.com/gofiber/fiber/v2/middleware/recover"
)

func main() {
app := fiber.New()
app.Use(recover.New())
app.Use(logger.New())

app.Get("/", func(c *fiber.Ctx) error {
return c.JSON(fiber.Map{
"message": "Go LLM RAG Pipeline is running ",
"status":  "ok",
})
})

app.Get("/health", func(c *fiber.Ctx) error {
return c.SendString("OK")
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


package main

import (
	"github.com/gin-gonic/gin"
	"github.com/piotrd22/guessGame/backend/controllers"
	"github.com/piotrd22/guessGame/backend/initializers"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	r := gin.Default()

	r.POST("/users", controllers.UserCreate)

	r.Run()
}

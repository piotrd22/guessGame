package main

import (
	"github.com/gin-contrib/cors"
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

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}

	r.Use(cors.New(config))

	r.POST("/users", controllers.UserCreate)
	r.GET("/hall-of-fame", controllers.GetHallOfFame)
	r.DELETE("/users", controllers.DeleteUsers)
	r.PUT("/check/:id", controllers.Check)
	r.DELETE("/users/:id", controllers.DeleteUser)

	r.Run()
}

package main

import (
	"github.com/piotrd22/guessGame/backend/initializers"
	"github.com/piotrd22/guessGame/backend/models"
)

func init() {
	initializers.ConnectToDB()
	initializers.LoadEnvVariables()
}

func main() {
	initializers.DB.AutoMigrate(&models.User{})
}

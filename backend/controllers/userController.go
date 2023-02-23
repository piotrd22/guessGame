package controllers

import (
	"math/rand"

	"github.com/gin-gonic/gin"
	"github.com/piotrd22/guessGame/backend/initializers"
	"github.com/piotrd22/guessGame/backend/models"
)

func UserCreate(c *gin.Context) {
	// req.body
	var body struct {
		Name string
	}

	c.Bind(&body)

	random := rand.Intn(100) + 1

	user := models.User{Name: body.Name, NumToGuess: random}
	result := initializers.DB.Create(&user)

	if result.Error != nil {
		c.Status(400)
		return
	}

	c.JSON(200, gin.H{
		"user": user.Name,
	})
}

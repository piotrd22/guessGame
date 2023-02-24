package controllers

import (
	"fmt"
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
		"user": user,
	})
}

func GetHallOfFame(c *gin.Context) {
	var users []models.User
	result := initializers.DB.Where("is_guessed = ?", true).Order("tries DESC").Limit(30).Find(&users)

	if result.Error != nil {
		c.Status(400)
		return
	}

	c.JSON(200, gin.H{
		"hallOfFame": users,
	})
}

func Check(c *gin.Context) {
	id := c.Param("id")

	var body struct {
		NumberToGuess int
	}

	c.Bind(&body)

	var user models.User
	result := initializers.DB.First(&user, id)

	if result.Error != nil {
		c.Status(400)
		return
	}

	if user.NumToGuess == body.NumberToGuess {
		initializers.DB.First(&user, id).Updates(models.User{Tries: user.Tries + 1, IsGuessed: true})
		var record models.User
		initializers.DB.Order("tries DESC").Limit(1).Find(&record)

		if user.Tries < record.Tries {
			answer := fmt.Sprintf("You won in %v tries and break global record!", user.Tries)
			c.JSON(200, gin.H{
				"answer": answer,
			})

		} else if user.Tries == record.Tries {
			answer := fmt.Sprintf("You won in %v tries and equal global record!", user.Tries)
			c.JSON(200, gin.H{
				"answer": answer,
			})

		} else {
			answer := fmt.Sprintf("You won in %v tries", user.Tries)
			c.JSON(200, gin.H{
				"answer": answer,
			})
		}

	} else if user.NumToGuess < body.NumberToGuess {
		initializers.DB.First(&user, id).Update("tries", user.Tries+1)
		c.JSON(200, gin.H{
			"message": "Given number is too big",
		})
	} else {
		initializers.DB.First(&user, id).Update("tries", user.Tries+1)
		c.JSON(200, gin.H{
			"message": "Given number is too small",
		})
	}
}

// To take Query c.Query("queryName")
// To take Param c.Param("paramName") example id := c.Param("id")

package models

import "gorm.io/gorm"

type User struct {
	gorm.Model // gorm.Model add us ID, CreatedAt, UpdatedAt, DeletedAt
	Name       string
	Tries      int `gorm:"default:-1"`
	NumToGuess int
}

// equals
// type User struct {
// 	ID        uint           `gorm:"primaryKey"`
// 	CreatedAt time.Time
// 	UpdatedAt time.Time
// 	DeletedAt gorm.DeletedAt `gorm:"index"`
// 	Name string
//   }

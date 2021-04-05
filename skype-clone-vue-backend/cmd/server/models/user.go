package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID             primitive.ObjectID `bson:"_id"`
	Username       string             `bson:"username"`
	Firstname      string             `bson:"firstname"`
	Lastname       string             `bson:"lastname"`
	Email          string             `bson:"email"`
	ImgUrl         string             `bson:"img_url"`
	Socket         string             `bson:"socket"`
	IsOnline       bool               `bson:"is_online"`
	unreadMessages int                `bson:"unread_messages"`
	Completed      bool               `bson:"completed"`
	CreatedAt      time.Time          `bson:"created_at"`
	UpdatedAt      time.Time          `bson:"updated_at"`
}

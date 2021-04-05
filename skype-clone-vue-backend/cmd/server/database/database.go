package database

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var userCollection *mongo.Collection
var ctx = context.TODO()

func Init() error {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017/")
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
		return err
	}
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
		return err
	}
	database := client.Database("skype-clone-db")
	userCollection = database.Collection("users")
	fmt.Println("Database connection successful")
	return nil
}

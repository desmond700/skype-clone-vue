package main

import (
	"fmt"
	"log"

	database "github.com/desmond700/skype-clone-vue/skype-clone-vue-backend/cmd/server/database"
	route "github.com/desmond700/skype-clone-vue/skype-clone-vue-backend/cmd/server/routes"
	socket "github.com/desmond700/skype-clone-vue/skype-clone-vue-backend/cmd/server/socket"
	iris "github.com/kataras/iris"
)

func main() {
	fmt.Println("entered main")
	if err := database.Init(); err != nil {
		log.Fatal(err)
	}
	app := route.Router()
	io := socket.NewConnection(app)

	// go io
	io.Initialise()

	app.Run(iris.Addr(":8000"),
		iris.WithoutPathCorrection,
		iris.WithoutServerError(iris.ErrServerClosed),
	)
}

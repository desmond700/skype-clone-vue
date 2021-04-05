package socket

import (
	"fmt"
	"log"

	socketio "github.com/googollee/go-socket.io"
	iris "github.com/kataras/iris"
)

type IO struct {
	app *iris.Application
}

func NewConnection(app *iris.Application) *IO {
	return &IO{
		app: app,
	}
}

func (io *IO) Initialise() {
	io.handleSocketEvents(io.app)
}

func (io *IO) handleSocketEvents(app *iris.Application) {
	println("socket.io main")
	server, serveError := socketio.NewServer(nil)
	if serveError != nil {
		log.Fatalln(serveError)
	}

	server.OnConnect("/", func(s socketio.Conn) error {
		s.SetContext("")
		fmt.Println("connected:", s.ID())
		return nil
	})

	server.OnError("/", func(s socketio.Conn, e error) {
		fmt.Println("meet error:", e)
	})

	server.OnDisconnect("/", func(s socketio.Conn, reason string) {
		fmt.Println("closed", reason)
	})

	go server.Serve()
	defer server.Close()

	app.HandleMany("GET POST", "/socket.io/{any:path}", iris.FromStd(server))

}

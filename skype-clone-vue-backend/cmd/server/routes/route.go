package routes

import (
	"github.com/kataras/iris"
)

func Router() *iris.Application {
	app := iris.New()
	// Optionally, add two builtin handlers
	// that can recover from any http-relative panics
	// and log the requests to the terminal.
	// app.Use(recover.New())
	// app.Use(logger.New())

	// Serve a controller based on the root Router, "/".
	// mvc.New(app).Handle(new(ExampleController))
	// // Add custom path func
	// mvc.New(app).SetCustomPathWordFunc(func(path, w string, wordIndex int) string {

	// 	if wordIndex == 0 {
	// 		w = strings.ToLower(w)
	// 	}
	// 	path += w
	// 	return  path

	// }).Handle(new(ExampleControllerCustomPath))
	return app
}

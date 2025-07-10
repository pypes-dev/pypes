package server

import (
	"fmt"
	"net/http"
	"os"

	"github.com/danielgtaylor/huma/v2"
	"github.com/danielgtaylor/huma/v2/adapters/humachi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/go-redis/redis"
	"github.com/pypes-dev/slurp/db"
	"github.com/pypes-dev/slurp/handlers"
	custom "github.com/pypes-dev/slurp/middleware"
	"github.com/spf13/cobra"
)

var ServerCmd = &cobra.Command{
	Use:   "serve",
	Short: "Serve the bot server at 0:0:0:0:8888",
	Long:  `A fast and flexible go server designed to handle bot instructions for all the allply resume and application processes`,
	RunE: func(cmd *cobra.Command, args []string) error {
		// setup db connection
		err := db.Initialize()
		if err != nil {
			fmt.Fprintf(os.Stderr, "Failed to initialize database: %v\n", err)
			os.Exit(1)
		}

		rdb := redis.NewClient(&redis.Options{
			Addr: os.Getenv("REDIS_URL"),
		})

		// Create a new router & API
		router := chi.NewMux()

		router.Use(middleware.RequestID)
		router.Use(middleware.Logger)
		router.Use(middleware.Recoverer)

		// Basic CORS
		router.Use(cors.Handler(cors.Options{
			// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
			AllowedOrigins: []string{"*"},
			// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
			AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowedHeaders: []string{"*"},
			ExposedHeaders: []string{"Link"},
			// AllowCredentials: false,
			MaxAge: 300,
		}))

		api := humachi.New(router, huma.DefaultConfig("Allply API", "1.0.0"))
		api.UseMiddleware(custom.RedisMiddleware(api, rdb))

		huma.Register(api, huma.Operation{OperationID: "resume-upload",
			Method:      http.MethodPost,
			Path:        "/resume-upload",
			Summary:     "Upload a resume from the user and insert a record transaction in the postgres db",
			Description: "Resume Upload",
			Tags:        []string{"Resume", "Upload", "Files"},
		}, handlers.HandleFileUpload)

		huma.Register(api, huma.Operation{OperationID: "resume-processed",
			Method:      http.MethodGet,
			Path:        "/resume-upload/{id}",
			Summary:     "Fetch the processed resume information",
			Description: "Resume Processed",
			Tags:        []string{"Resume", "Upload", "Files"},
		}, handlers.GetProcessedPDF)

		err = http.ListenAndServe("0.0.0.0:8888", router)

		if err != nil {
			panic(err)
		}
		return nil
	},
}

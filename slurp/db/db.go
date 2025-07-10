package db

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var pool *pgxpool.Pool

func Initialize() error {
	var err error
	dbsn := os.Getenv("DATABASE_URL")

	fmt.Printf("DATABASE_URL: %s", dbsn)
	if dbsn == "" {
		panic("SET DATABASE_URL ENV VARIABLE")
	}

	openaiApiKey := os.Getenv("OPENAI_API_KEY")

	fmt.Printf("OPENAI_API_KEY: %s", openaiApiKey)
	if openaiApiKey == "" {
		panic("SET OPENAI_API_KEY ENV VARIABLE")
	}

	pool, err = pgxpool.New(context.Background(), dbsn)
	if err != nil {
		return fmt.Errorf("unable to connect to database: %w", err)
	}

	return nil
}

func Close() {
	if pool != nil {
		pool.Close()
	}
}

func Pool() *pgxpool.Pool {
	return pool
}

package main

import (
	"fmt"
	"os"

	"github.com/google/uuid"
	"github.com/pypes-dev/slurp/server"
	"github.com/rs/zerolog"
	"github.com/spf13/cobra"
)

func main() {
	uuid.EnableRandPool()
	zerolog.SetGlobalLevel(zerolog.DebugLevel)

	rootCmd := &cobra.Command{
		Use:     "slurp",
		Version: "0.0.1",
	}

	rootCmd.AddCommand(server.ServerCmd)

	err := rootCmd.Execute()
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

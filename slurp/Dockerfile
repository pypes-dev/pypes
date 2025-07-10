FROM golang:latest

# Install CompileDaemon
RUN go install github.com/githubnemo/CompileDaemon@latest
RUN apt-get update && apt-get install -y poppler-utils wv unrtf tidy 

WORKDIR /app/slurp
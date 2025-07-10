package handlers

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"mime"
	"mime/multipart"
	"os"
	"strconv"
	"strings"
	"time"

	"code.sajari.com/docconv"
	"github.com/go-redis/redis"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	types "github.com/pypes-dev/slurp/common"
	"github.com/pypes-dev/slurp/db"
	"github.com/sashabaranov/go-openai"
)

type contextKey string

const (
	redisKey  contextKey = "redis"
	cancelKey contextKey = "cancel"
)

type FileUploadRequest struct {
	RawBody     []byte
	ContentType string `header:"Content-Type"`
}

// XXX: this should be an actual DB somewhere, but we're trying to get something working end to end here
var hashMap = map[uuid.UUID]*ParsedPDF{}

func HandleFileUpload(ctx context.Context, input *FileUploadRequest) (*types.CreateResponse[ParsedPDF], error) {
	contentType := input.ContentType
	resp := &types.CreateResponse[ParsedPDF]{}
	resp.Body.RecordsCreated = 0

	conn, err := db.Pool().Acquire(context.Background())
	if err != nil {
		return resp, err
	}
	defer conn.Release()

	_, params, err := mime.ParseMediaType(contentType)
	if err != nil {
		return resp, err
	}

	reader := multipart.NewReader(bytes.NewReader(input.RawBody), params["boundary"])
	for {
		part, err := reader.NextPart()
		if err == io.EOF {
			break
		}
		if err != nil {
			return resp, err
		}

		if part.FormName() == "file" {
			fileBytes, err := io.ReadAll(part)
			if err != nil {
				return resp, err
			}
			fmt.Printf("Received file: %s, size: %d bytes\n", part.FileName(), len(fileBytes))
			cacheKey := fmt.Sprintf("%s-%d", part.FileName(), len(fileBytes))
			rdb := ctx.Value("redis").(*redis.Client)

			val, err := rdb.Get(cacheKey).Result()

			// cache hit
			if err == nil && val != "" {
				fmt.Printf("VAL %s", val)

				// Deserialize the JSON string back into a struct
				var transRetrievedFromCache ParsedPDF
				err = json.Unmarshal([]byte(val), &transRetrievedFromCache)
				if err != nil {
					fmt.Println("Error deserializing transRetrievedFromCache:", err)
				}
				resp.Body.Record = transRetrievedFromCache
				return resp, nil
			}

			// Create a bytes.Buffer from the fileBytes for file-like operations in memory
			buffer := bytes.NewBuffer(fileBytes)

			// Now, buffer can be used similarly to a file opened with os.Open
			// For example, reading from the buffer:
			content, metadata, err := docconv.ConvertPDF(buffer)
			if err != nil {
				return resp, err
			}
			parsed := &ParsedPDF{
				ID:       uuid.New(),
				Content:  content,
				Metadata: metadata,
			}

			jsonBytes, err := json.Marshal(parsed)
			if err != nil {
				fmt.Println("Error marshaling parsed to JSON:", err)
			}

			jsonString := string(jsonBytes)
			query := `INSERT INTO Resume_upload_transaction (transaction_id, file_name, file_size, resume_processed_json) VALUES (@transactionId, @fileName, @fileSize, @jsonHere) RETURNING *`
			args := pgx.NamedArgs{
				"transactionId": parsed.ID,
				"fileName":      part.FileName(),
				"fileSize":      strconv.Itoa(len(fileBytes)),
				"jsonHere":      jsonString,
			}

			_, err = conn.Exec(ctx, query, args)

			if err != nil {
				return resp, err
			}
			ctx2, cancelFunc := context.WithCancel(context.Background())
			ctx2 = context.WithValue(ctx2, redisKey, rdb)
			ctx2 = context.WithValue(ctx2, cancelKey, cancelFunc)
			go extractPDFInfo(parsed, cacheKey, ctx2)
			resp.Body.Record = *parsed

			return resp, nil
		}

		part.Close()
	}

	return resp, nil
}

type ParsedPDF struct {
	ID          uuid.UUID         `json:"id"`
	Content     string            `json:"content"`
	Metadata    map[string]string `json:"metadata"`
	Skills      []string          `json:"skills"`
	Name        string            `json:"name"`
	Location    string            `json:"location"`
	LinkedinURL string            `json:"linkedin_url"`
	GithubURL   string            `json:"github_url"`
	Education   []*Education      `json:"education"`
	Experience  []*Experience     `json:"experience"`
	Suggestion  string            `json:"suggestion"`
	Status      string            `json:"status"`
}

type Education struct {
	Degree    string `json:"degree"`
	School    string `json:"school"`
	Location  string `json:"location"`
	StartDate string `json:"start_date"`
	EndDate   string `json:"end_date"`
}

type Experience struct {
	Company     string   `json:"company"`
	Position    string   `json:"position"`
	StartDate   string   `json:"start"`
	EndDate     string   `json:"end"`
	Description []string `json:"description"`
}

func extractPDFInfo(p *ParsedPDF, cacheKey string, ctx context.Context) error {
	prompt := "Below is an extraction of the text of a resume. Produce a comma-separated list of the programming languages this person has experience with. Don't include any other text before or after.\n" + p.Content
	openAIKey := os.Getenv("OPENAI_API_KEY")
	openAIClient := openai.NewClient(openAIKey)
	fmt.Println(p.ID, "Processing skills...")
	p.Status = "processingSkills"
	resp, err := openAIClient.CreateChatCompletion(context.TODO(), openai.ChatCompletionRequest{
		Model: openai.GPT3Dot5Turbo,
		Messages: []openai.ChatCompletionMessage{
			{
				Role:    openai.ChatMessageRoleUser,
				Content: prompt,
			},
		},
	})
	if err != nil {
		fmt.Println("ERR:", err)
		return err
	}

	content := resp.Choices[0].Message.Content
	content = strings.TrimPrefix(content, ".") // commonly includes periods at the end
	p.Skills = strings.Split(content, ", ")
	p.Status = "processedSkills"

	prompt = "Below is an extraction of the text of a resume. Produce a json blob with the following fields: 'name', 'location', 'linkedin_url', 'github_url', 'education', 'experience'. education should be an array of blobs containing 'degree', 'school', 'location', 'end_date'. experience should be an array of blobs containing 'company', 'position', 'start', 'end', 'description'. Where description is three full sentences describing their work experience in an array. Return start and end in MMM YYYY format. Don't include any other text before or after.\n" + p.Content
	fmt.Println(p.ID, "Processing metadata...")
	p.Status = "processingMetadata"
	resp, err = openAIClient.CreateChatCompletion(context.TODO(), openai.ChatCompletionRequest{
		Model: openai.GPT3Dot5Turbo,
		Messages: []openai.ChatCompletionMessage{
			{
				Role:    openai.ChatMessageRoleUser,
				Content: prompt,
			},
		},
	})
	if err != nil {
		fmt.Println("ERR:", err)
		return err
	}

	err = json.Unmarshal([]byte(resp.Choices[0].Message.Content), p)
	if err != nil {
		fmt.Println("ERR:", err)
		return err
	}
	p.Status = "processedMetadata"

	prompt = "Below is an extraction of the text of a resume. Produce some suggestions on how to improve the resume. Don't include any formatting suggestions, as the formatting may be affected by the text extraction.\n" + p.Content
	fmt.Println(p.ID, "Processing suggestion...")
	resp, err = openAIClient.CreateChatCompletion(context.TODO(), openai.ChatCompletionRequest{
		Model: openai.GPT3Dot5Turbo,
		Messages: []openai.ChatCompletionMessage{
			{
				Role:    openai.ChatMessageRoleUser,
				Content: prompt,
			},
		},
	})

	if err != nil {
		fmt.Println("ERR:", err)
		return err
	}

	content = resp.Choices[0].Message.Content
	content = strings.TrimPrefix(content, ".") // commonly includes periods at the end
	p.Suggestion = content
	fmt.Println(p.ID, "Processing finished...")
	p.Status = "processedSuggestions"
	query := `UPDATE Resume_upload_transaction  SET resume_processed_json = @jsonHere WHERE transaction_id= @transactionId RETURNING *`
	// parsedRecord := ResumeUploadTransaction{}
	jsonBytes, err := json.Marshal(p)
	if err != nil {
		fmt.Println("Error marshaling parsed to JSON:", err)
	}
	conn, err := db.Pool().Acquire(context.Background())
	if err != nil {
		return err
	}
	defer conn.Release()

	jsonString := string(jsonBytes)
	args := pgx.NamedArgs{
		"transactionId": p.ID,
		"jsonHere":      jsonString,
	}

	_, err = conn.Exec(ctx, query, args)
	// err = pgxscan.Get(context.Background(), conn, &parsedRecord, query, jsonString, p.ID)
	if err != nil {
		return err
	}
	userJSON, err := json.Marshal(p)
	if err != nil {
		fmt.Println("Error serializing user:", err)
	}

	// Store the JSON string in Redis
	rdb := ctx.Value("redis").(*redis.Client)
	err = rdb.Set(cacheKey, userJSON, 0).Err()
	if err != nil {
		fmt.Println("Error storing user in Redis:", err)
	}

	cancelFunc := ctx.Value("cancel").(context.CancelFunc)
	cancelFunc()

	return nil
}

type GetProcessedResume struct {
	Id uuid.UUID `path:"id" maxLength:"100"`
}

func GetProcessedPDF(ctx context.Context, input *GetProcessedResume) (*types.ReadResponse[ParsedPDF], error) {
	resp := &types.ReadResponse[ParsedPDF]{}
	resp.Body.RecordsCount = 0
	id := input.Id

	if p, ok := hashMap[id]; ok {
		resp.Body.Records = []ParsedPDF{*p}
		return resp, nil
	} else {
		return resp, nil
	}
}

type ResumeUploadTransaction struct {
	TransactionID   uuid.UUID              `json:"transaction_id"`
	UserId          uuid.UUID              `json:"user_id"`
	FileName        string                 `json:"file_name"`
	FileSize        string                 `json:"file_size"`
	CreatedDtsGmt   time.Time              `json:"created_dts_gmt"`
	ModifiedDtsGmt  time.Time              `json:"modified_dts_gmt"`
	ResumeParsedPDF map[string]interface{} `json:"resume_processed_json" db:"resume_processed_json"`
}

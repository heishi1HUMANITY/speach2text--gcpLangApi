package main

import (
	"context"
	"fmt"
	"log"

	language "cloud.google.com/go/language/apiv1"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	languagepb "google.golang.org/genproto/googleapis/cloud/language/v1"
)

func main() {
	ctx := context.Background()
	client, err := language.NewClient(ctx)
	if err != nil {
		log.Fatalf("Failed to crete client: %v", err)
	}

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
	}))

	router.GET("/api/v1/sentiment", func(c *gin.Context) {
		sentiment, err := client.AnalyzeSentiment(ctx, &languagepb.AnalyzeSentimentRequest{
			Document: &languagepb.Document{
				Source: &languagepb.Document_Content{
					Content: c.Query("text"),
				},
				Type: languagepb.Document_PLAIN_TEXT,
			},
			EncodingType: languagepb.EncodingType_UTF8,
		})
		if err != nil {
			c.JSON(500, gin.H{
				"err": err,
			})
			return
		}
		fmt.Println(sentiment.Sentences)
		c.JSON(200, gin.H{
			"result": sentiment.Sentences,
		})
	})

	router.Run(":8080")
}

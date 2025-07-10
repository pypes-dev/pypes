package middleware

import (
	"github.com/danielgtaylor/huma/v2"
	"github.com/go-redis/redis"
)

func RedisMiddleware(api huma.API, rdb *redis.Client) func(ctx huma.Context, next func(huma.Context)) {
	return func(ctx huma.Context, next func(huma.Context)) {
		ctx = huma.WithValue(ctx, "redis", rdb)
		next(ctx)
	}
}

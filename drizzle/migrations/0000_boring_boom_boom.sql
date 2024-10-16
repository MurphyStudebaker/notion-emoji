CREATE TABLE IF NOT EXISTS "emojis_v2" (
	"id" text PRIMARY KEY NOT NULL,
	"emoji" text NOT NULL,
	"description" text NOT NULL,
	"tags" text NOT NULL,
	"embedding" vector(1536)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "emojis" (
	"id" text PRIMARY KEY NOT NULL,
	"emoji" text NOT NULL,
	"description" text NOT NULL,
	"tags" text NOT NULL,
	"embedding" vector(1536)
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "emojis_v2_embedding_index" ON "emojis_v2" USING hnsw (embedding vector_cosine_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "emojis_embedding_index" ON "emojis" USING hnsw (embedding vector_cosine_ops);
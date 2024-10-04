CREATE TABLE IF NOT EXISTS "emojis" (
	"id" text PRIMARY KEY NOT NULL,
	"emoji" text NOT NULL,
	"description" text NOT NULL,
	"tags" text NOT NULL,
	"embedding" vector(384)
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "emojis_embedding_index" ON "emojis" USING hnsw (embedding vector_cosine_ops);
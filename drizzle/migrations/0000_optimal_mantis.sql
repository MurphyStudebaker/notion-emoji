CREATE TABLE IF NOT EXISTS "emojis" (
	"id" text PRIMARY KEY NOT NULL,
	"Emojis" text NOT NULL,
	"Description" text NOT NULL,
	"Semantic_Tags" text NOT NULL,
	"embedding" vector(1536)
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "emojis_embedding_index" ON "emojis" USING hnsw (embedding vector_cosine_ops);
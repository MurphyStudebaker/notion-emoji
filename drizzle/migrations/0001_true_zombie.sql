CREATE TABLE IF NOT EXISTS "emojis_llm" (
	"id" text PRIMARY KEY NOT NULL,
	"emoji" text NOT NULL,
	"description" text NOT NULL,
	"tags" text NOT NULL,
	"embedding" vector(384)
);
--> statement-breakpoint
DROP TABLE "emojis";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "emojis_llm_embedding_index" ON "emojis_llm" USING hnsw (embedding vector_cosine_ops);
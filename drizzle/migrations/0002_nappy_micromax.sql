ALTER TABLE "emojis_llm" RENAME TO "emojis";--> statement-breakpoint
DROP INDEX IF EXISTS "emojis_llm_embedding_index";--> statement-breakpoint
ALTER TABLE "emojis" ALTER COLUMN "embedding" SET DATA TYPE vector(1536);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "emojis_embedding_index" ON "emojis" USING hnsw (embedding vector_cosine_ops);
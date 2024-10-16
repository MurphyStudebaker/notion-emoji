import { index, pgTable, text, vector } from "drizzle-orm/pg-core";
import { randomUUID } from "crypto";

export const emojis = pgTable(
  "emojis_v2",
  {
    id: text("id")
      .primaryKey()
      .notNull()
      .$defaultFn(() => randomUUID()),
    emoji: text("emoji").notNull(),
    description: text("description").notNull(),
    tags: text("tags").notNull(),
    embedding: vector("embedding", { dimensions: 1536 }),
  },
  (table) => ({
    embeddingIndex: index().using(
      "hnsw",
      table.embedding.op("vector_cosine_ops")
    ),
  })
);

export const emojisOld = pgTable(
  "emojis",
  {
    id: text("id")
      .primaryKey()
      .notNull()
      .$defaultFn(() => randomUUID()),
    emoji: text("emoji").notNull(),
    description: text("description").notNull(),
    tags: text("tags").notNull(),
    embedding: vector("embedding", { dimensions: 1536 }),
  },
  (table) => ({
    embeddingIndex: index().using(
      "hnsw",
      table.embedding.op("vector_cosine_ops")
    ),
  })
);

export type SelectEmoji = typeof emojis.$inferSelect;

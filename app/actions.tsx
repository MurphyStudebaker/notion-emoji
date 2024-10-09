"use server";

import { db } from "@/drizzle/db";
import { SelectEmoji, emojis } from "@/drizzle/schema";
import { openai } from "@/lib/openai";
import { desc, sql, cosineDistance } from "drizzle-orm";
import { embed } from "ai";

export async function searchEmojis(
  query: string
): Promise<Array<Pick<SelectEmoji, "id" | "emoji"> & { similarity: number }>> {
  try {
    if (query.trim().length === 0) return [];

    const embedding = await generateEmbedding(query);
    const vectorQuery = `[${embedding.join(",")}]`;

    const similarity = sql<number>`1 - (${cosineDistance(
      emojis.embedding,
      vectorQuery
    )})`;

    const similarEmojis = await db
      .select({
        id: emojis.id,
        emoji: emojis.emoji,
        tags: emojis.tags,
        similarity,
      })
      .from(emojis)
      .orderBy((t) => desc(t.similarity))
      .limit(8);
    return similarEmojis;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function generateEmbedding(raw: string) {
  // OpenAI recommends replacing newlines with spaces for best results
  const input = raw.replace(/\n/g, " ");
  const { embedding } = await embed({
    model: openai.embedding("text-embedding-3-small"),
    value: input,
  });
  return embedding;
}

export async function chooseRandomEmoji() {
  const allEmojis = await db
    .select({
      emoji: emojis.emoji,
    })
    .from(emojis);
  let selection = allEmojis[Math.floor(Math.random() * allEmojis.length)];
  return selection;
}

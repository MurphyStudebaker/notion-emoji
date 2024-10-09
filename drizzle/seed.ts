import "dotenv/config";
import { db } from "./db";
import { emojis } from "./schema";
import { eq } from "drizzle-orm";
import { openai } from "../lib/openai";
// import emojiData from "./emojis_embeddings.json";
import { embed } from "ai";

// for seeding locally
// require("dotenv").config({ path: ".env.local" });

if (!process.env.OPENAI_API_KEY) {
  throw new Error("process.env.OPENAI_API_KEY is not defined. Please set it.");
}

if (!process.env.POSTGRES_URL) {
  throw new Error("process.env.POSTGRES_URL is not defined. Please set it.");
}

async function main() {
  try {
    const sparkle = await db.query.emojis.findFirst({
      where: (emojis, { eq }) => eq(emojis.emoji, "\u2747\ufe0f"),
    });

    if (sparkle) {
      console.log("Emoji database already seeded!");
      return;
    }
  } catch (error) {
    console.error(
      "Error checking if \u2747\ufe0f (sparkle emoji) exists in the database."
    );
    throw error;
  }
  let count = 0;
  // for (const record of (emojiData as any).data) {
  //   let { emoji, description, tags, embedding } = record;
  //   if (typeof embedding === "string") {
  //     // Convert the string embedding to an array of numbers
  //     embedding = JSON.parse(embedding);
  //     // Optionally, ensure all elements are numbers (if needed)
  //     embedding = embedding.map(Number);
  //   }
  //   console.log("Processing " + emoji);

  //   const [response] = await db
  //     .insert(emojis)
  //     .values({
  //       emoji: emoji,
  //       description: description,
  //       tags: tags,
  //       embedding: embedding,
  //     })
  //     .returning();
  // }

  // const embedding = await generateEmbedding(
  //   `${p.description} This emoji is associated with ${p.tags}`
  // );
  // await new Promise((r) => setTimeout(r, 500)); // Wait 500ms between requests;

  //   // Create the pokemon in the database

  // await db
  //   .update(emojis)
  //   .set({
  //     embedding,
  //   })
  //   .where(eq(emojis.id, emoji.id));

  //   console.log(`Added ${count} ${emoji.emoji}`);
  //   count = count + 1;
  // }

  // Uncomment the following lines if you want to generate the JSON file
  // fs.writeFileSync(
  //   path.join(__dirname, "./emojis-with-embeddings.json"),
  //   JSON.stringify({ data }, null, 2),
  // );
  console.log("Emoji database seeded successfully!");
}
main()
  .then(async () => {
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);

    process.exit(1);
  });

async function generateEmbedding(raw: string) {
  // OpenAI recommends replacing newlines with spaces for best results
  const input = raw.replace(/\n/g, " ");
  const { embedding } = await embed({
    model: openai.embedding("text-embedding-3-small"),
    value: input,
  });
  return embedding;
}

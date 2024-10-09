import "dotenv/config";
import { db } from "./db";
import { emojis } from "./schema";
import { eq } from "drizzle-orm";
import { openai } from "../lib/openai";
import { embed } from "ai";

// for seeding locally
// import emojiData from "./emojis_embeddings.json";
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

  // UN-COMMENT BELOW TO SEED LOCALLY FROM DATA FILE
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

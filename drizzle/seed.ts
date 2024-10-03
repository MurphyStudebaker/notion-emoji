import "dotenv/config";
import { db } from "./db";
import { emojis } from "./schema";
import { eq } from "drizzle-orm";
import { openai } from "../lib/openai";
import emojiData from "./emojis.json";
import { embed } from "ai";
import { generateEmbedding } from "@/app/actions";

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
  for (const record of (emojiData as any).data.slice(0, 10)) {
    const { ...p } = record;

    const embedding = await generateEmbedding(p.description);
    await new Promise((r) => setTimeout(r, 500)); // Wait 500ms between requests;

    // Create the pokemon in the database
    const [emoji] = await db.insert(emojis).values(p).returning();

    await db
      .update(emojis)
      .set({
        embedding,
      })
      .where(eq(emojis.id, emoji.id));

    console.log(`Added ${emoji.id} ${emoji.emoji}`);
  }

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

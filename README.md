# Notion Smart Emoji Selection

This is a demo of a feature I desperately want Notion to incorporate to their application. When I create a new page, type a title, and click "Add Emoji" the app currently picks an emoji at random. Why not replace that with a smart emoji selection based on the title text that was just entered?

-> Demo <-

## How it Works

This demo is built using Next.js, using the Transormers.js library from Hugging Face to perform client-side inference. When a user clicks the "Add Emoji" button, the current page title is transformed into an embedding and comapred against a pre-computed vector database of emojis (stored in Vercel's Postgres database with pgvector to enable vector search). The emoji embeddings are computed using a dataset of LLM-generated descriptions and tags. Cosine similarity is used to return the most similar emoji to the title text, and that emoji is displayed as the page icon.

## Resources

This work was heavily influenced by the following resources.

- [Vercel Postgres and pgvector starter](https://vercel.com/templates/next.js/postgres-pgvector)
- [Emojeez Semantic Search](https://github.com/badrex/emojeez/tree/main)
- [LLM Descriptions of Emojis Dataset](https://huggingface.co/datasets/badrex/llm-emoji-dataset)
- [Next.js + Hugging Face Tutorial](https://huggingface.co/docs/transformers.js/en/tutorials/next)

## Author

made by [Murphy Studebaker](https://www.linkedin.com/in/murphystude/) a machine learning engineer who likes to ship ✨

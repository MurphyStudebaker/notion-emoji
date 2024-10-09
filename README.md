# Notion Smart Emoji Selection

This is a demo of a feature I desperately want Notion to incorporate to their application. When I create a new page, type a title, and click "Add Emoji" the app currently picks an emoji at random. Why not replace that with a smart emoji selection based on the title text that was just entered?

-> **[See it in Action](https://notion-emoji.vercel.app)** <-

## How it Works

This demo is built using Next.js, using the Embeddings model from OpenAI + Vercel's AI SDK to perform client-side inference. When a user clicks the "Add Emoji" button, the current page title is transformed into an embedding and compared against a pre-computed vector database of emojis (stored in Vercel's Postgres database with pgvector to enable vector search). The emoji embeddings are computed using a dataset of attributes and LLM-generated sample titles. Cosine similarity is used to return the most similar emoji to the title text, and that emoji is displayed as the page icon.

## Creating the Dataset

### Creation

I first searched for emoji-related datasets available on the web. Many of these were designed for sentiment analysis or single word replacement tasks, which were not compatible with my goals. I found two open-source data sets for my initial test:

- Emoji with LLM Descriptions
- Emoji Popularity

I first generated the embeddings using only the first dataset, but I quickly realized this lacked a lot of the subtext carried by many emojis.

I then used OpenAI's completion API to create a list of titles that each emoji may be used as an icon for. In the real world, I would simply source this data from users on Notion. But I am not Notion...so this was a decent proxy.

Here is a sample of output from this task.

| Emoji | LLM Generated Titles |
| ----- | -------------------- |
| 🙏    | "Gratitude Journal", |

    "Mindfulness and Meditation Reflections",
    "Acts of Kindness",
    "Thank You Notes",
    "Prayers and Intentions",
    "Cultivating Humility",
    "Moments of Reflection",
    "Daily Affirmations",
    "Expressions of Appreciation",
    "Meditative Practices",
    "Lessons in Forgiveness",
    "Connections and Community",
    "Finding Peace in Chaos",
    "Helping Others: A Commitment",
    "Celebrating the Good in Life"|

| 🚀 | "Launch Plans",
"Next Steps for Project X",
"Rocket Science: A Beginner's Guide",
"Space Exploration History",
"Innovation and Startups",
"Boosting Productivity Tips",
"Mission to Mars: A Timeline",
"Getting Started with Space Tech",
"Future Trends in Aerospace",
"Elevating Your Career: Tips for Growth",
"Succeeding in High-Stakes Environments",
"The New Space Race",
"Achieving Your Goals: Strategies for Success",
"Engineering a Successful Launch",
"Creative Ideas for the Next Big Thing"|
| 🍑 | "Sweet Summer Recipes","Juicy Fruits to Try","Body Positivity and Self-Love","Flirty Texts for Your Crush","Healthy Snack Ideas","Tropical Vacation Essentials","Gardening Tips for Stone Fruits","Creative Smoothie Combos","The Art of Seduction","Celebrating Southern Culture","Iconic Food Symbolism in Pop Culture","Fruity Cocktails for Parties","Spring and Summer Fashion Trends","Exploring the Benefits of Peaches","Cutest Produce in the Farmers Market" |

I then embedded each emoji by passing in their meta-data attributes from the datasets above along with the sample titles created by the LLM. This is the final version in the demo today.

### Evaluation

To evaluate the quality of the embeddings, I collected a small test set of the titles and emojis of pages within my own Notion account. Ideally, this would be a large dataset of real Notion user data (but I make do with what I have).

I then tried alternate versions of the embeddings and evaluated them by choosing the most similar embedding to the title text. For each selected emoji, I would calculate its similarity to the "true" emoji (the one I chose for the page), with identical emojis receiving a similarity of 1.0. I then computed the average similarity score across all truth examples.

| Embedding Version                                         | Average Similarity |
| --------------------------------------------------------- | ------------------ |
| Description and Tags                                      | 0.6736             |
| Name, Categories, Description, Tags, LLM-Generated Titles | 0.6837             |
| Name, Categories, LLM-Generated Titles                    | 0.7361             |

## Resources

This work was heavily influenced by the following resources.

- [Vercel Postgres and pgvector starter](https://vercel.com/templates/next.js/postgres-pgvector)
- [Emojeez Semantic Search](https://github.com/badrex/emojeez/tree/main)
- [LLM Descriptions of Emojis Dataset](https://huggingface.co/datasets/badrex/llm-emoji-dataset)
- [Next.js + Hugging Face Tutorial](https://huggingface.co/docs/transformers.js/en/tutorials/next)

## Author

made by [Murphy Studebaker](https://www.linkedin.com/in/murphystude/) a machine learning engineer who likes to ship ✨

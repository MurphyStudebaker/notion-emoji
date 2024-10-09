# Notion Smart Emoji Selection

This is a demo of a feature I desperately want Notion to incorporate to their application. When I create a new page, type a title, and click "Add Emoji" the app currently picks an emoji at random. Why not replace that with a smart emoji selection based on the title text that was just entered?

-> **[See it in Action](https://notion-emoji.vercel.app)** <-

## How it Works

This demo is built using Next.js, using the Embeddings model from OpenAI + Vercel's AI SDK to perform client-side inference. When a user clicks the "Add Emoji" button, the current page title is transformed into an embedding and compared against a pre-computed vector database of emojis (stored in Vercel's Postgres database with pgvector to enable vector search). The emoji embeddings are computed using a dataset of attributes and LLM-generated sample titles. Cosine similarity is used to return the most similar emoji to the title text, and that emoji is displayed as the page icon.

## Creating the Dataset

### Creation

I first searched for emoji-related datasets available on the web. Many of these were designed for sentiment analysis or single word replacement tasks, which were not compatible with my goals, since I needed a single emoji to represent the main concept of a short piece of title text.

I first generated the embeddings using only a [dataset](https://huggingface.co/datasets/badrex/llm-emoji-dataset) of emojis and LLM-generated descriptions and tags, but I quickly realized this data lacked a lot of the subtext carried by many emojis (performance is listed below).

I then found a [dataset](https://home.unicode.org/emoji/emoji-frequency/) with name, category, and sub-category information along with the emoji's popularity, but this only had data up until 2021.

I then decided to used OpenAI's completion API to create a list of titles that each emoji may be used as an icon for. In the real world, I would simply source this data from users on Notion. But I am not Notion...so this was a decent proxy. Spot-checking a few titles suggested a promising inclusion of a range of emojis in different meaningful contexts captured in this generated data, rather than only the literal meaning of the image.

Here is a sample of output from this task.
| Emoji | LLM Generated Titles |
| ----- | -------------------- |
| 🙏 | "Gratitude Journal",<br>"Mindfulness and Meditation Reflections",<br>"Acts of Kindness",<br>"Thank You Notes",<br>"Prayers and Intentions",<br>"Cultivating Humility",<br>"Moments of Reflection",<br>"Daily Affirmations",<br>"Expressions of Appreciation",<br>"Meditative Practices",<br>"Lessons in Forgiveness",<br>"Connections and Community",<br>"Finding Peace in Chaos",<br>"Helping Others: A Commitment",<br>"Celebrating the Good in Life" |
| 🚀 | "Launch Plans",<br>"Next Steps for Project X",<br>"Rocket Science: A Beginner's Guide",<br>"Space Exploration History",<br>"Innovation and Startups",<br>"Boosting Productivity Tips",<br>"Mission to Mars: A Timeline",<br>"Getting Started with Space Tech",<br>"Future Trends in Aerospace",<br>"Elevating Your Career: Tips for Growth",<br>"Succeeding in High-Stakes Environments",<br>"The New Space Race",<br>"Achieving Your Goals: Strategies for Success",<br>"Engineering a Successful Launch",<br>"Creative Ideas for the Next Big Thing" |
| 🍑 | "Sweet Summer Recipes",<br>"Juicy Fruits to Try",<br>"Body Positivity and Self-Love",<br>"Flirty Texts for Your Crush",<br>"Healthy Snack Ideas",<br>"Tropical Vacation Essentials",<br>"Gardening Tips for Stone Fruits",<br>"Creative Smoothie Combos",<br>"The Art of Seduction",<br>"Celebrating Southern Culture",<br>"Iconic Food Symbolism in Pop Culture",<br>"Fruity Cocktails for Parties",<br>"Spring and Summer Fashion Trends",<br>"Exploring the Benefits of Peaches",<br>"Cutest Produce in the Farmers Market" |

I then embedded each emoji by passing in their meta-data attributes from the datasets above along with the sample titles created by the LLM. This is the final version in the demo today.

### Evaluation

To evaluate the quality of the embeddings, I collected a small test set of the titles and emojis of pages within my own Notion account. Ideally, this would be a large dataset of real Notion user data (but I make do with what I have).

I then tried alternate versions of the embeddings and evaluated them by choosing the most similar embedding to the title text. For each selected emoji, I would calculate its similarity to the "true" emoji (the one I chose for the page), with identical emojis receiving a similarity of 1.0. I then computed the average similarity score across all truth examples. The goal of this metric was to evaluate how well these embeddings would have done selecting exactly what I would have picked, with room for scenarios where there are many appropriate options (such as `"Personal Finance"` selecting `💵` or `🏦`)

| Embedding Version                                         | Average Similarity |
| --------------------------------------------------------- | ------------------ |
| Description and Tags                                      | 0.6736             |
| Name, Categories, Description, Tags, LLM-Generated Titles | 0.6837             |
| Name, Categories, LLM-Generated Titles                    | 0.7361             |

As you can see, the description and tags from the first data-set actually hindered the performance of the embeddings, and removing them improved selection of appropriate emojis.

## Data

The complete data files of around 2K emojis and their embeddings are too large to upload directly to GitHub. Thus, an abbreviated sample is given in `/data/`.

## Resources

This work was heavily influenced by the following resources.

- [Vercel Postgres and pgvector starter](https://vercel.com/templates/next.js/postgres-pgvector)
- [Emojeez Semantic Search](https://github.com/badrex/emojeez/tree/main)
- [LLM Descriptions of Emojis Dataset](https://huggingface.co/datasets/badrex/llm-emoji-dataset)
- [Next.js + Hugging Face Tutorial](https://huggingface.co/docs/transformers.js/en/tutorials/next)

## Author

made by [Murphy Studebaker](https://www.linkedin.com/in/murphystude/) a machine learning engineer who can ship ✨

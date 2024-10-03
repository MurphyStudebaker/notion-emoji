import pandas as pd
import json

# Load the pickle file
data = pd.read_pickle('emoji_llm.pkl')
transformed_data = {
    "data": [value for value in data.values()]
}
# Write the dictionary to a JSON file
with open('emojis.json', 'w') as f:
    json.dump(transformed_data, f)
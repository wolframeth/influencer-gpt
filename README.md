# Influencer-GPT

### About

A simple daemon that creates prompt request to Open AI and posts the answers to Twitter. Create an OpenAI account and obtain your API Key. Also create a Twitter developer account with **Elevated** access.

https://openai.com/blog/chatgpt
https://developer.twitter.com/en

### Installation

To get started, run `npm install` then configure the application as per Recommended Workflow (below).

#### 1.) .env file

Configure your .env file by copying the .env-example and renamig it `.env`. Fill out the keys with the information you've collected in the prior stages. It is not necessary to encapsulate the values in quotes inside the `.env` file.

```
TWITTER_API_KEY=
TWITTER_API_SECRET=
TWITTER_ACCESS_TOKEN=
TWITTER_ACCESS_SECRET=
OPEN_AI_KEY=
TIME_TO_POST_IN_MS=15000
```

#### 2.) Prompt file

Create a list of prompts by editing the prompts.json (copy prompts-example.json and rename to prompts.json). The list must be contained as an array.

### Scripts

#### `npm install`

Install the dependencies required to use the application.

#### `npm run start`

Run the program.

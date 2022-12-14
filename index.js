import * as dotenv from "dotenv";
import * as fs from "fs";
import { TwitterApi } from "twitter-api-v2";

dotenv.config({ path: ".env" });

const twitterConfig = {
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
};
const twitterClient = new TwitterApi(twitterConfig);

const tweet = async (post) => {
  try {
    const tweeted = await twitterClient.v1.tweet(post);
    if (tweeted === false) {
      throw false;
    }
    return tweeted;
  } catch (e) {
    console.log("Twitter Error:", e);
    return false;
  }
};

const prompt = async (prompt) => {
  try {
    const request = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + process.env.OPEN_AI_KEY,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.9,
        max_tokens: 120,
      }),
    });
    if (
      request === false ||
      request === null ||
      (request.status !== 200 && request.status !== 201)
    ) {
      throw false;
    }
    return await request.json();
  } catch (e) {
    console.log("Open AI Error:", e);
    return false;
  }
};

const loadJSON = (path) =>
  JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

const pickPromptAndTweet = async () => {
  const prompts = loadJSON("./prompts.json");
  const promptPicked = prompts[Math.floor(Math.random() * prompts.length)];
  const prompted = await prompt(promptPicked);
  if (promptPicked === false) {
    return false;
  }
  const answer = prompted.choices[0].text.replaceAll("\n", "");
  const tweetThis = await tweet(answer);
};

const main = () => {
  pickPromptAndTweet();
  setInterval(() => {
    pickPromptAndTweet();
  }, process.env.TIME_TO_POST_IN_MS);
};

main();


import dotenv from "dotenv";

dotenv.config();
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function getAIDostInsight(text) {
  const prompt = `
You are AIDost, a caring and supportive friend.

Analyze the following diary entries and give emotional insight.
Be warm, personal, and encouraging.

Entries:
${text}
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message.content;
}

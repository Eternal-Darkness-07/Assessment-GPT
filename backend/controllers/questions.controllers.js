import dotenv from "dotenv";
import { ForQuestions } from "../utils/prompts.js";

dotenv.config();

export const getQuestions = async (req, res) => {
  const { topic, count } = req.body;
  count = Math.min(10, count); //Max 10 questions will be generate


  if (!process.env.API_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const prompt = ForQuestions(count, topic);

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-zero:free",
          messages: [
            {
              role: 'system',
              content: 'You are an expert educational AI that generates multiple-choice questions with answers and explanations.',
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenRouter API error:', data);
      return res.status(500).json({ error: "OpenRouter API error: " + (data.error?.message || 'Unknown error') });
    }

    const text = data.choices?.[0]?.message?.content;
    if (!text) {
      return res.status(500).json({ error: "No response from OpenRouter" });
    }

    let questions;
    try {
      const match = text.match(/\[[\s\S]*\]/);
      if (!match) {
        return res.status(500).json({ error: "No JSON found in response" });
      }
      questions = JSON.parse(match[0]);
    } catch (err) {
      console.error('JSON parse error:', err);
      return res.status(500).json({ error: "Failed to parse JSON" });
    }

    res.status(200).json({ questions });

  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: "Failed to fetch data from OpenRouter" });
  }
};

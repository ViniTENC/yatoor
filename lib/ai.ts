import Anthropic from "@anthropic-ai/sdk";

// Nunca expongas esta key en el cliente: usar solo desde API routes / server actions.
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function askTourGuide(prompt: string) {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });
  return message;
}

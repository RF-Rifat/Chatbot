// app/api/chat/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

// Your API key from the Google Cloud Console
const apiKey = process.env.GOOGLE_API_KEY;

// Create a new instance of the Google Generative AI client
const genAI = new GoogleGenerativeAI(apiKey!);

// IMPORTANT: Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Get the last message
  const lastMessage = messages[messages.length - 1];

  // Generate a response using Gemini
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContentStream(lastMessage.content);

  // Convert the response to a friendly text-stream
  const stream = GoogleGenerativeAIStream(result);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}

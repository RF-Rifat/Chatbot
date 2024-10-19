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

  // const custom prompt that instructs the AI
  const customPrompt = `You are an AI assistant for Tsn-Edu-Glow-Network, a consultancy website offering services for studying at universities in Malaysia. You provide professional advice on selecting universities, navigating the application process, securing scholarships, understanding visa procedures, and managing living costs in Malaysia. Additionally, you can guide users to specific sections of the website.

Here are some examples of queries you may address:
1. "What are the best universities in Malaysia for international students?"
2. "How do I apply to universities in Malaysia?"
3. "What scholarships are available for students studying in Malaysia?"
4. "What are the student visa requirements for Malaysia?"
5. "What is the cost of living for international students in Malaysia?"

If the user needs additional information, direct them to these relevant sections:
- FAQ: [**FAQ**](/faq)
- Contact Us: [**Contact Us**](/contact)
- Services: [**Services**](/services)
- Universities: [**Universities**](/universities) -- This page includes details about all the universities in Malaysia and their specific requirements.)

Respond professionally, ensuring your answers are accurate, concise, and helpful. The user's question is: "${lastMessage.content}"`;

  // Generate a response using Gemini
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContentStream(customPrompt);

  // Convert the response to a friendly text-stream
  const stream = GoogleGenerativeAIStream(result);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}

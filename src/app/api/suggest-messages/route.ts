import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { 
  AISDKError,
  APICallError,
  LoadAPIKeyError,
  NoContentGeneratedError
} from 'ai';

export async function POST(req: Request) {
  try {
    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structered like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment."

    const result = streamText({
      model: anthropic("claude-sonnet-4.5"),
      prompt,
    });

    // ✅ Handle mid-stream errors here
    return result.toUIMessageStreamResponse({
      onError: (error) => {
        console.error("Stream error:", error);
        return "An error occurred while generating the response.";
      },
    });

  } catch (error) {
    // ✅ This catches pre-stream errors (bad API key, invalid model, etc.)
    if (APICallError.isInstance(error)) {
      console.error("API call failed:", error.message);
      return new Response(
        JSON.stringify({ error: "API call failed", details: error.message }),
        { status: error.statusCode ?? 500, headers: { "Content-Type": "application/json" } }
      );

    } else if (LoadAPIKeyError.isInstance(error)) {
      console.error("API key error:", error.message);
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );

    } else if (NoContentGeneratedError.isInstance(error)) {
      console.error("No content generated:", error.message);
      return new Response(
        JSON.stringify({ error: "Model returned no content" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );

    } else if (AISDKError.isInstance(error)) {
      console.error("AI SDK error:", error.message);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );

    } else {
      console.error("Unexpected error:", error);
      return new Response(
        JSON.stringify({ error: "An unexpected error occurred" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
}
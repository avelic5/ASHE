import { chatWithAI } from "./chatWithAI";

export interface QuestionData {
  question: string;
  answers: Array<{
    answer: string;
    description: string;
    suggestion: string;
  }>;
}

export interface GeneratedQuestions {
  [key: string]: QuestionData[];
}

/**
 * Generates questions in q&a.json format from custom problem text using AI
 */
export async function generateQuestionsFromText(
  customText: string
): Promise<QuestionData[]> {
  const prompt = `You are a mental health assessment expert. Based on the following user description, generate 5 therapeutic questions in the exact JSON format specified below.

User's description: "${customText}"

Generate 5 questions that help explore the user's thoughts, feelings, and experiences related to this topic. Each question should have 4 answer options.

IMPORTANT: For each answer option, you must provide:
1. **answer**: A single word (only one word, no phrases) that represents a possible response
2. **description**: A personalized insight that explains what choosing THIS SPECIFIC answer reveals about the user's mental/emotional state, thoughts, or patterns. This should be unique to each answer and reveal something meaningful about the user's psychology. Use second person ("You feel...", "Your...", etc.)
3. **suggestion**: A specific, actionable, and supportive suggestion tailored to THIS PARTICULAR answer choice. It should directly address the insight revealed by the description and provide helpful guidance.

Example of good answer structure (note: answer must be a single word):
{
  "answer": "Work",
  "description": "Your main source of stress comes from a sense of responsibility.",
  "suggestion": "Set clear boundaries between your obligations and your rest time."
}

Each answer option must have a UNIQUE description and suggestion that is specifically tailored to that answer choice. The description should reveal what that answer says about the user, and the suggestion should provide relevant advice for someone who would choose that answer.

Return ONLY valid JSON in this exact format (no markdown, no code blocks, just pure JSON):
{
  "questions": [
    {
      "question": "Question text here?",
      "answers": [
        {
          "answer": "Answer option 1",
          "description": "Personalized insight about what this specific answer reveals about the user",
          "suggestion": "Specific actionable advice tailored to this answer choice"
        },
        {
          "answer": "Answer option 2",
          "description": "Personalized insight about what this specific answer reveals about the user",
          "suggestion": "Specific actionable advice tailored to this answer choice"
        },
        {
          "answer": "Answer option 3",
          "description": "Personalized insight about what this specific answer reveals about the user",
          "suggestion": "Specific actionable advice tailored to this answer choice"
        },
        {
          "answer": "Answer option 4",
          "description": "Personalized insight about what this specific answer reveals about the user",
          "suggestion": "Specific actionable advice tailored to this answer choice"
        }
      ]
    }
  ]
}

CRITICAL REQUIREMENTS:
- Each answer must be EXACTLY ONE WORD (no spaces, no hyphens, no phrases)
- Questions are thoughtful, therapeutic, and appropriate for mental health assessment
- Each answer's description and suggestion are unique and specifically tailored to that answer
- Descriptions use second person and reveal meaningful psychological insights
- Suggestions are actionable and directly address the insight from the description`;

  try {
    const response = await chatWithAI(prompt);
    
    // Try to extract JSON from the response (in case it's wrapped in markdown)
    let jsonString = response.trim();
    
    // Remove markdown code blocks if present
    if (jsonString.startsWith("```json")) {
      jsonString = jsonString.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (jsonString.startsWith("```")) {
      jsonString = jsonString.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }
    
    // Try to find JSON object in the response (in case there's extra text)
    const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonString = jsonMatch[0];
    }
    
    // Parse the JSON
    const parsed = JSON.parse(jsonString);
    
    if (parsed.questions && Array.isArray(parsed.questions)) {
      // Validate that we have at least one question
      if (parsed.questions.length === 0) {
        throw new Error("No questions generated");
      }
      
      // Validate question structure
      const validQuestions = parsed.questions.filter((q: any) => 
        q.question && 
        q.answers && 
        Array.isArray(q.answers) && 
        q.answers.length >= 4 &&
        q.answers.every((a: any) => {
          // Ensure answer is a single word (no spaces)
          const isSingleWord = a.answer && typeof a.answer === 'string' && a.answer.trim().split(/\s+/).length === 1;
          return isSingleWord && a.description && a.suggestion;
        })
      );
      
      if (validQuestions.length === 0) {
        throw new Error("Generated questions are missing required fields");
      }
      
      return validQuestions;
    } else {
      throw new Error("Invalid response format: missing questions array");
    }
  } catch (error) {
    console.error("Error generating questions:", error);
    if (error instanceof SyntaxError) {
      throw new Error("Failed to parse AI response. Please try again.");
    }
    throw error instanceof Error ? error : new Error("Failed to generate questions. Please try again.");
  }
}

/**
 * Stores generated questions in localStorage
 */
export function storeCustomQuestions(customText: string, questions: QuestionData[]): void {
  const key = `custom_questions_${customText.toLowerCase().replace(/\s+/g, "_")}`;
  localStorage.setItem(key, JSON.stringify(questions));
}

/**
 * Retrieves generated questions from localStorage
 */
export function getCustomQuestions(customText: string): QuestionData[] | null {
  const key = `custom_questions_${customText.toLowerCase().replace(/\s+/g, "_")}`;
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error("Error parsing stored questions:", error);
      return null;
    }
  }
  return null;
}


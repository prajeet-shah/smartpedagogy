const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-8b:generateContent";

async function evaluateWithGemini(question, answer) {
  const prompt = `
Evaluate the following answer based on the given question using these parameters (0–10):
- Accuracy
- Completeness
- Creativity
- Reasoning
- Writing Quality
- Instruction Following

Question:
${question}

Answer:
${answer}

Provide the result as JSON with keys:
accuracy, completeness, creativity, reasoning, writingQuality, instructionFollowing, overallComment
`;

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const textResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textResponse) throw new Error("Empty Gemini response");

    const jsonMatch = textResponse.match(/\{[\s\S]*?\}/);
    if (!jsonMatch) throw new Error("No JSON found in Gemini response");

    const parsed = JSON.parse(jsonMatch[0]);

    // ✅ Ensure all fields are numbers (fallback to 0)
    return {
      accuracy: Number(parsed.accuracy) || 0,
      completeness: Number(parsed.completeness) || 0, // will be overwritten anyway
      creativity: Number(parsed.creativity) || 0,
      reasoning: Number(parsed.reasoning) || 0,
      writingQuality: Number(parsed.writingQuality) || 0,
      instructionFollowing: Number(parsed.instructionFollowing) || 0,
      overallComment: parsed.overallComment || "No comment",
    };
  } catch (err) {
    console.error("Gemini API error:", err.message);
    return {
      accuracy: 0,
      completeness: 0,
      creativity: 0,
      reasoning: 0,
      writingQuality: 0,
      instructionFollowing: 0,
      overallComment: "AI evaluation failed.",
    };
  }
}

module.exports = evaluateWithGemini;

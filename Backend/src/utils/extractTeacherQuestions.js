// 📁 utils/extractTeacherQuestions.js (Updated for Tesseract v6.0.1)

const pdf = require("pdf-parse");
const { recognize } = require("tesseract.js");
const { decodeBase64File } = require("./decode");

function extractQuestionsFromText(text) {
  const questionStarters = [
    "what",
    "why",
    "how",
    "define",
    "explain",
    "when",
    "where",
    "who",
    "which",
    "write",
  ];

  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => {
      if (line.length < 5) return false;

      // If it ends with '?', it's a question
      if (line.endsWith("?")) return true;

      // Remove numbering like '1. ', '2)', etc.
      const normalizedLine = line.replace(/^\d+[\.\)]?\s*/, "").toLowerCase();

      // If line starts with question starter (e.g., "what", "how", etc.)
      return questionStarters.some((starter) =>
        normalizedLine.startsWith(starter)
      );
    });
}

async function extractQuestionsFromPdf(base64Pdf) {
  const buffer = decodeBase64File(base64Pdf);
  const data = await pdf(buffer);
  return extractQuestionsFromText(data.text);
}

async function extractQuestionsFromImage(base64Image) {
  const buffer = decodeBase64File(base64Image);
  const { data } = await recognize(buffer, "eng"); // ✅ Tesseract v6 API
  return extractQuestionsFromText(data.text);
}

function getMimeType(base64String) {
  const match = base64String.match(/^data:(.*?);base64,/);
  return match ? match[1] : null;
}

async function extractTeacherQuestions(assignment) {
  if (assignment.description) {
    return extractQuestionsFromText(assignment.description);
  }

  if (assignment.file) {
    const mimeType = getMimeType(assignment.file);
    if (mimeType === "application/pdf") {
      return await extractQuestionsFromPdf(assignment.file);
    } else if (mimeType.startsWith("image/")) {
      return await extractQuestionsFromImage(assignment.file);
    }
  }

  throw new Error(
    "No valid question source found in assignment (file or description)."
  );
}

module.exports = extractTeacherQuestions;

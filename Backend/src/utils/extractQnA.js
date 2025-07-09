const pdf = require("pdf-parse");
const { createWorker } = require("tesseract.js");
const { decodeBase64File } = require("./decode");

function getFileMimeType(base64String) {
  const match = base64String.match(/^data:(.*?);base64,/);
  return match ? match[1] : null;
}

async function extractQnA(fileBase64) {
  try {
    const mimeType = getFileMimeType(fileBase64);
    if (!mimeType) throw new Error("Invalid base64 format");

    const buffer = decodeBase64File(fileBase64);
    let text = "";

    if (mimeType === "application/pdf") {
      const data = await pdf(buffer);
      text = data.text;
    } else if (mimeType.startsWith("image/")) {
      const worker = await createWorker("eng");
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");

      const { data } = await worker.recognize(buffer);
      text = data.text;

      await worker.terminate();
    } else {
      throw new Error("Unsupported file type. Only PDF and image formats are supported.");
    }

    // Simple QnA extraction: detect questions followed by answers
    const qnaList = [];
    const qnaPattern = /(.*?)\?\s*([\s\S]*?)(?=\n\S.*?\?|$)/g;

    let match;
    while ((match = qnaPattern.exec(text))) {
      const question = match[1].trim().replace(/\n/g, " ");
      const answer = match[2].trim().replace(/\n/g, " ");
      if (question && answer) {
        //console.log({question, answer});
        qnaList.push({ question, answer });
      }
    }

    return qnaList;
    
  } catch (err) {
    console.error("❌ Error in extractQnA:", err.message);
    return [];
  }
}

module.exports = extractQnA;

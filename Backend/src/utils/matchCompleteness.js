function normalize(text) {
  return text
    .toLowerCase()
    .replace(/^[0-9]+\\.?\s*/, "") // Remove leading numbering like "12. "
    .replace(/[?.!,]/g, "") // Remove punctuation
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
}

function calculateCompleteness(teacherQuestions, studentQnA) {
  if (!Array.isArray(teacherQuestions) || !Array.isArray(studentQnA)) {
    console.warn("Invalid inputs to calculateCompleteness");
    return 0;
  }

  let matchedQuestions = 0;

  for (const tq of teacherQuestions) {
    const normTeacherQ = normalize(tq);

    const isMatched = studentQnA.some((qna) => {
      const normStudentQ = normalize(qna.question);
      return normTeacherQ === normStudentQ;
    });

    if (isMatched) {
      matchedQuestions++;
    }
  }

  const completeness = Math.round(
    (matchedQuestions / teacherQuestions.length) * 100
  );

  console.log(
    `🧮 Normalized match: ${matchedQuestions}/${teacherQuestions.length}`
  );
  return completeness;
}

module.exports = { calculateCompleteness };

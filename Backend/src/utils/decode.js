// utils/decode.js

function decodeBase64File(base64String) {
  // Remove metadata prefix (e.g., "data:application/pdf;base64,")
  const base64Data = base64String.split(",")[1];
  return Buffer.from(base64Data, "base64");
}

module.exports = {
  decodeBase64File,
};

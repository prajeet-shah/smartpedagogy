function decodeBase64File(base64String) {
  const base64Data = base64String.split(",")[1];
  return Buffer.from(base64Data, "base64");
}

module.exports = {
  decodeBase64File,
};

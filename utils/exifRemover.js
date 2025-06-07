const sharp = require("sharp");

const RemoveExif = async (base64Image) => {
  const matches = base64Image.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 image format");
  }

  const buffer = Buffer.from(matches[2], "base64");

  const cleanedBuffer = await sharp(buffer)
    .jpeg({ mozjpeg: true }) // or .png() based on your format
    .toBuffer();

  const cleanedBase64 = `data:image/jpeg;base64,${cleanedBuffer.toString(
    "base64"
  )}`;
  return cleanedBase64;
};

module.exports = {RemoveExif}

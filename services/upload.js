const cloudinary = require("cloudinary").v2;

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload an image buffer to Cloudinary
 * @param {Object} params
 * @param {Buffer} params.buffer - File buffer
 * @param {string} [params.filename] - Optional public_id/filename (without extension)
 * @param {Array|Object} [params.transformation] - Optional Cloudinary transformation(s)
 * @returns {Promise<object>} Cloudinary upload result
 */
const uploadImageFromBuffer = ({
  buffer,
  filename,
  overwrite = true,
  transformation,
}) => {
  if (!buffer) {
    return Promise.reject(new Error("No file buffer provided"));
  }

  const targetFolder = process.env.CLOUDINARY_FOLDER || "bdpa";

  return new Promise((resolve, reject) => {
    const uploadOptions = {
      resource_type: "image",
      folder: targetFolder,
      public_id: filename,
      overwrite,
      use_filename: Boolean(filename),
      unique_filename: !filename,
      transformation,
    };

    const stream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      }
    );

    stream.end(buffer);
  });
};

module.exports = { uploadImageFromBuffer };

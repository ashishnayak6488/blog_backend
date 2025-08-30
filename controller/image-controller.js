import cloudinary from '../utils/cloudinary.js';

export const uploadImage = async (request, response) => {
  try {
    console.log('Received file:', request);
    if (!request.file) {
      return response.status(404).json({ msg: "File not found" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) {
          return response.status(500).json({ msg: error.message });
        }
        return response.status(200).json({ url: result.secure_url });
      }
    ).end(request.file.buffer);

  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
};

export const getImage = async (request, response) => {
  try {
    // Find image info by filename or id in your DB
    const image = await ImageModel.findOne({ filename: request.params.filename });
    if (!image) {
      return response.status(404).json({ msg: "Image not found" });
    }
    // Return the Cloudinary URL
    return response.status(200).json({ url: image.url });
  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
};

const cloudinary = require('../utils/cloudinary');

class CloudinaryController {
  async uploadImage(req, res) {
    try {
      const image = req.body.img;
      const uploadedResponse = await cloudinary.v2.uploader.upload(image, {
        upload_preset: '' || req.body.preset,
      });
      return res.status(200).json(uploadedResponse);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
}

module.exports = new CloudinaryController();

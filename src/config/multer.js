const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary.js');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'produk',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });
module.exports = upload;

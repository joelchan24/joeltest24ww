const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file ) => {
    return {
      folder: "micro-habits",
      allowedFormats:["png", "jpg","jpeg","svg","webp"],
      fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(svg | gif | doc)$/)){
          return cb(new Error('the file format is invalid'))
        }
        cb(null, file.originalname)
      },
      public_id: `app-${file.originalname}`
    }
  }
})

const uploadCloud = multer({storage})

module.exports = uploadCloud
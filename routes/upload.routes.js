const router = require("express").Router();
const {
  uploadProcess,
  deleteImage,
} = require("../controllers/upload.controller");
const uploadCloud = require("../helpers/cloudinary");
const { verifyToken } = require("../middlewares");

// upload multiple images
router.post("/uploads", uploadCloud.array("images", 3), uploadProcess);

// upload single image
router.post("/single", uploadCloud.single("image"), uploadProcess);

// delete image
router.delete("/deleteImages/:name", verifyToken, deleteImage);

module.exports = router;

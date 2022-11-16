const cloudinary = require("cloudinary");

exports.uploadProcess = async (req, res) => {
  const uploads = (file, folder) => {
    return new Promise((resolve) => {
      cloudinary.uploader.upload(file, (result) => {
        resolve(
          {
            url: result.url,
            id: result.public_id,
          },
          {
            resource_type: "auto",
            folder,
          }
        );
      });
    });
  };

  const uploader = async (path) => uploads(path, "images");

  if (req.method === "POST") {
    const urls = [];
    const files = req.files;
    if (!req.file) {
      for (const file in files) {
        const { path } = file;
        const newPath = await uploader(path);

        urls.push({
          uri: newPath.url,
          id: newPath.id,
          name: file.originalname,
        });
      }
      res.status(200).json({ urls, succesMessage: "saved images" });
    } else {
      const { path } = req.file;
      const newPath = await uploader(path);
      const url = {
        uri: newPath.url,
        id: newPath.id,
        name: req.file.originalname,
      };
      res.status(200).json({ url, succesMessage: "saved image" });
    }
  } else {
    res.status(400).json({ errorMessage: `${req.method} not allowed ` });
  }
};

exports.deleteImage = (req, res) => {
  const { name } = req.params;
  cloudinary.v2.uploader.destroy(`micro-habits/${name}`, (error, result) => {
    if (error) {
      return res.status(400).json({
        errorMessage: error,
      });
    }
    res.status(200).json({ succesMessage: "file deleted" });
  });
};

const router = require("express").Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const adminRoutes = require("./admin.routes");
const habitRoutes = require("./habit.routes");
const communityRoutes = require("./community.routes");
const visionRoutes = require("./visionBoard.routes");
const uploadRoutes = require('./upload.routes')

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/user", userRoutes);
router.use("/habit", habitRoutes);
router.use("/community", communityRoutes);
router.use("/visionBoard", visionRoutes);
router.use('/upload', uploadRoutes)


module.exports = router;

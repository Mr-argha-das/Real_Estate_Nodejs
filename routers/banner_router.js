const express = require("express");
const BannerController = require("../controllers/Banner_controller");

const BannerRouter = express();

BannerRouter.post("/", BannerController.createBanner);
BannerRouter.get("/", BannerController.getBanners);
BannerRouter.get("/:id", BannerController.getBannerById);
BannerRouter.delete("/:id", BannerController.deleteBannerById);
// BannerRouter.put("/:id", BannerController.updateBannerById);

module.exports = BannerRouter;

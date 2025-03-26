const express = require("express");
const BannerController = require("../controllers/Banner_controller");

const BannerRouter = express();

BannerRouter.post("/", BannerController.createBanner);
BannerRouter.get("/", BannerController.getBanners);

// WhyChoseRouter.get("/", whyChoseController.getAllWhyChose);
// WhyChoseRouter.put("/:id", upload.array("small_features", 5), whyChoseController.updateWhyChose);

module.exports = BannerRouter;

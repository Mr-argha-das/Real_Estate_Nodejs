const express = require("express");
const whyChoseController = require("../controllers/why_chose_controller");
const WhyChoseRouter = express();
const upload = require("../service/img_service"); // Multer setup


WhyChoseRouter.post("/", upload.array("small_features", 5), whyChoseController.createWhyChose);
WhyChoseRouter.get("/", whyChoseController.getAllWhyChose);
WhyChoseRouter.put("/:id", upload.array("small_features", 5), whyChoseController.updateWhyChose);

module.exports = WhyChoseRouter;

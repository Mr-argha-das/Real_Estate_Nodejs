const express = require("express")
const AboutUsRouter = express()
const aboutUsController = require("../controllers/about_us_controller")

AboutUsRouter.post("/",aboutUsController.createAboutUs)
AboutUsRouter.get("/",aboutUsController.getAllAboutUs)
AboutUsRouter.get("/:id",aboutUsController.getAboutUs)
AboutUsRouter.put("/:id",aboutUsController.updateAboutUs)

module.exports = AboutUsRouter

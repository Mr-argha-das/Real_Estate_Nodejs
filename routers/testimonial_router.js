const express = require("express")
const TestimonialsRouter = express()
const testimonialsController = require("../controllers/testimonial_controller")
const upload = require("../service/img_service")

TestimonialsRouter.post("/",upload.single("image") ,testimonialsController.createTestimonial)
TestimonialsRouter.get("/",testimonialsController.getAllTestimonials)
TestimonialsRouter.put("/:id",upload.array("image",5) ,testimonialsController.updateTestimonial)
TestimonialsRouter.delete("/:id",testimonialsController.deleteTestimonial)

module.exports = TestimonialsRouter




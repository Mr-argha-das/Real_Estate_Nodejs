const express = require("express");
const TestimonialsRouter = express();
const testimonialsController = require("../controllers/testimonial_controller");
const upload = require("../service/img_service");

TestimonialsRouter.post(
  "/",
  upload.single("image"),
  testimonialsController.createTestimonial
);
TestimonialsRouter.get("/", testimonialsController.getAllTestimonials);
TestimonialsRouter.get("/:id", testimonialsController.getTestimonialById);

TestimonialsRouter.put(
  "/:id",
  // upload.single("image"),
  testimonialsController.updateTestimonialById
);

TestimonialsRouter.delete("/:id", testimonialsController.deleteTestimonialById);

module.exports = TestimonialsRouter;

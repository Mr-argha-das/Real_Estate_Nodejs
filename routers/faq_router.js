const {
  createFaq,
  getFaqs,
  getFaqsById,
  deleteFaqsById,
} = require("../controllers/faq_controller");

const express = require("express");
const FaqRouter = express();

// Routes
FaqRouter.post("/", createFaq);
FaqRouter.get("/", getFaqs);
FaqRouter.get("/:id", getFaqsById);
FaqRouter.delete("/:id", deleteFaqsById);

module.exports = FaqRouter;

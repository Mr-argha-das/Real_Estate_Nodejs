const {
  createFaq,
  getFaqs,
  updateFAQById,

  deleteFaqsById,
  getFaqById,
} = require("../controllers/faq_controller");

const express = require("express");
const FaqRouter = express();

// Routes
FaqRouter.post("/", createFaq);
FaqRouter.get("/", getFaqs);
FaqRouter.get("/:id", getFaqById);
FaqRouter.put("/:id", updateFAQById);
FaqRouter.delete("/:id", deleteFaqsById);

module.exports = FaqRouter;

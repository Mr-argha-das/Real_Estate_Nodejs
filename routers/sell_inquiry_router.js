const express = require("express");

const InquiryController = require("../controllers/sell_inquiry_controller");
const InquiryRouter = express.Router();

InquiryRouter.post("/", InquiryController.submitInquiry);
InquiryRouter.get("/", InquiryController.getAllInquiries);
InquiryRouter.delete("/:id", InquiryController.deleteSellInquiry);

module.exports = InquiryRouter;

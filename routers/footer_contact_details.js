const express = require("express");
const FooterContactDetailsRouter = express();
const FooterContactDetailsController = require("../controllers/footer_contact_controller");

FooterContactDetailsRouter.post(
  "/",
  FooterContactDetailsController.createFooterContactDetails
);
FooterContactDetailsRouter.get(
  "/",
  FooterContactDetailsController.getAllFooterContactDetails
);
FooterContactDetailsRouter.get(
  "/:id",
  FooterContactDetailsController.getFooterContactDetails
);
FooterContactDetailsRouter.put(
  "/:id",
  FooterContactDetailsController.updateFooterContactDetails
);

module.exports = FooterContactDetailsRouter;

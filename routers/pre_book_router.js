const express = require("express");
const preBookRouter = express();
const preBookController = require("../controllers/pre_book_controller");

preBookRouter.post("/", preBookController.createPreBook);

// preBookRouter.get("/:id", preBookController.getConsultant);
// preBookRouter.get("/", preBookController.getAllConsultants);
// preBookRouter.put(
//   "/:id",
//   upload.single("profile_pic"),
//   preBookController.updateConsultant
// );
// preBookRouter.delete("/:id", preBookController.deleteConsultant);

module.exports = preBookRouter;

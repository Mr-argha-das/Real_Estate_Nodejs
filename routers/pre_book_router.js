const express = require("express");
const preBookRouter = express();
const preBookController = require("../controllers/pre_book_controller");

preBookRouter.post("/", preBookController.createPreBook);
preBookRouter.get("/", preBookController.getAllPreBook);
preBookRouter.get("/:id", preBookController.getPreBookById);
preBookRouter.put("/:id", preBookController.updatePreBookById);
preBookRouter.delete("/:id", preBookController.deletePreBookById);

module.exports = preBookRouter;

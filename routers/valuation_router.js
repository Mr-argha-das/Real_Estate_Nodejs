const express = require("express");
const ValuationRouter = express();
const ValuationController = require("../controllers/valuation_controller");

ValuationRouter.post("/", ValuationController.createValuation);
ValuationRouter.get("/", ValuationController.getAllValuation);
ValuationRouter.get("/:id", ValuationController.getValuation);
ValuationRouter.put("/:id", ValuationController.updateValuation);

module.exports = ValuationRouter;

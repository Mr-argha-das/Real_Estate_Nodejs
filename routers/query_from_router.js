const express = require("express");
const QueryRouter = express.Router();
const {
  createQuery,
  getAllQueries,
  getQueryById,
  deleteQueryById,
} = require("../controllers/query_from_controller");

QueryRouter.post("/", createQuery);
QueryRouter.get("/", getAllQueries);
QueryRouter.get("/:id", getQueryById);
QueryRouter.delete("/:id", deleteQueryById);

module.exports = QueryRouter;

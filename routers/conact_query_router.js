const express = require("express");
const ContactQueryRouter = express.Router();
const {
  createQuery,
  getAllQueries,
  getQueryById,
  deleteQueryById,
} = require("../controllers/contact_query_controller");

ContactQueryRouter.post("/", createQuery);
ContactQueryRouter.get("/", getAllQueries);
ContactQueryRouter.get("/:id", getQueryById);
ContactQueryRouter.delete("/:id", deleteQueryById);

module.exports = ContactQueryRouter;

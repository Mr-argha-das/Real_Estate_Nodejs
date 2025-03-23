const express = require("express");
const communitiesController = require("../controllers/communities_controller");
const CommunitiesRouter = express();
const upload = require("../service/img_service");

CommunitiesRouter.post(
  "/",
  upload.single("image"),
  communitiesController.createCommunities
);

CommunitiesRouter.get("/", communitiesController.getAllCommunities);
CommunitiesRouter.get("/:id", communitiesController.getCommunitie);

CommunitiesRouter.put(
  "/:id",
  upload.single("image"),
  communitiesController.updateCommunitie
);

CommunitiesRouter.delete("/:id", communitiesController.deleteCommunitie);

module.exports = CommunitiesRouter;

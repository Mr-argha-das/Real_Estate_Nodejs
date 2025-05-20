const express = require("express");
const TeamRouter = express();
const teamMemberController = require("../controllers/team_controller");

// POST: Create a new member
TeamRouter.post("/", teamMemberController.createTeamMember);

// GET: Get all members
TeamRouter.get("/", teamMemberController.getAllTeamMembers);

// GET: Get a member by ID
TeamRouter.get("/:id", teamMemberController.getTeamMemberById);

// PUT: Update a member by ID
TeamRouter.put("/:id", teamMemberController.updateTeamMemberById);

// DELETE: Delete a member by ID
TeamRouter.delete("/:id", teamMemberController.deleteTeamMemberById);

module.exports = TeamRouter;

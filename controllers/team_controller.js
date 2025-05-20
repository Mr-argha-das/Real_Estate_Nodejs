const TeamMember = require("../models/team_model");

// Create a new team member (POST)
const createTeamMember = async (req, res) => {
  try {
    const member = new TeamMember(req.body);
    const savedMember = await member.save();
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all team members (GET)
const getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single team member by ID (GET)
const getTeamMemberById = async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ error: "Team member not found" });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a team member by ID (PUT)
const updateTeamMemberById = async (req, res) => {
  try {
    const updated = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Team member not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a team member by ID (DELETE)
const deleteTeamMemberById = async (req, res) => {
  try {
    const deleted = await TeamMember.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Team member not found" });
    }
    res.json({ message: "Team member deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  deleteTeamMemberById,
  updateTeamMemberById,
};

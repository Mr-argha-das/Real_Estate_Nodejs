const Query = require("../models/query_form_model");

// Create a new query
const createQuery = async (req, res) => {
  try {
    const { name, email, subject, phone, currency, message, acceptedPrivacy } =
      req.body;

    if (!name || !email || !subject || !phone || !currency || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!acceptedPrivacy) {
      return res
        .status(400)
        .json({ error: "Please Accept the Privacy Policy" });
    }

    const query = new Query({
      name,
      email,
      subject,
      phone,
      currency,
      message,
      acceptedPrivacy,
    });

    await query.save();
    res.status(201).json({ message: "Query submitted successfully", query });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all queries
const getAllQueries = async (req, res) => {
  try {
    const queries = await Query.find().sort({ createdAt: -1 });
    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get query by ID
const getQueryById = async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);
    if (!query) return res.status(404).json({ error: "Query not found" });
    res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete query by ID
const deleteQueryById = async (req, res) => {
  try {
    const query = await Query.findByIdAndDelete(req.params.id);
    if (!query) return res.status(404).json({ error: "Query not found" });

    res.status(200).json({ message: "Query deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createQuery,
  getAllQueries,
  getQueryById,
  deleteQueryById,
};

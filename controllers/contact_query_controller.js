const Query = require("../models/contact_query_model");

// Create a new query
const createQuery = async (req, res) => {
  try {
    const {
      name,
      email,
      nationality,
      phone,
      currency,
      message,
      property_type,
      bedroom,
      investment_reason,
      live_in_uae,
      resident_uae,
      acceptedPrivacy,
    } = req.body;

    if (!name || !email || !nationality || !phone || !currency || !message) {
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
      nationality,
      phone,
      currency,
      message,
      property_type,
      bedroom,
      investment_reason,
      live_in_uae,
      resident_uae,
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

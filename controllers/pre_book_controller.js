const PreBook = require("../models/prebook_model");

const createPreBook = async (req, res) => {
  try {
    const {
      name,
      email,
      property_id,
      phone,
      country_code,
      message,
      date,
      time,
    } = req.body;

    console.log(req.body);
    // Validate required fields
    if (
      !name ||
      !email ||
      !property_id ||
      !phone ||
      !country_code ||
      !message ||
      !date ||
      !time
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new pre-book entry
    const newPreBook = new PreBook({
      name,
      email,
      property_id,
      phone,
      country_code,
      message,
      date,
      time,
    });

    // Save to the database
    await newPreBook.save();

    return res.status(201).json({
      message: "Pre-booking created successfully.",
      preBook: newPreBook,
    });
  } catch (error) {
    console.error("Error creating pre-booking:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Get all PreBook
const getAllPreBook = async (req, res) => {
  try {
    const preBook = await PreBook.find();
    res.status(200).json(preBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get PreBook by ID
const getPreBookById = async (req, res) => {
  try {
    const preBook = await PreBook.findById(req.params.id);
    if (!preBook) {
      return res.status(404).json({ message: "PreBook not found" });
    }
    res.status(200).json(preBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePreBookById = async (req, res) => {
  try {
    const updatedPreBook = await PreBook.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedPreBook)
      return res
        .status(404)
        .json({ status: false, message: "PreBook not found" });
    return res.status(200).json({
      status: true,
      message: "PreBook updated successfully",
      data: updatedPreBook,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).json({ status: false, message: error.message });
  }
};
// Delete PreBook by ID
const deletePreBookById = async (req, res) => {
  try {
    const preBook = await PreBook.findByIdAndDelete(req.params.id);
    if (!preBook) {
      return res.status(404).json({ message: "PreBook not found" });
    }
    res.status(200).json({ message: "PreBook deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPreBook,
  deletePreBookById,
  updatePreBookById,
  getPreBookById,
  getAllPreBook,
};

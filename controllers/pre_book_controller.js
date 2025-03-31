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

module.exports = { createPreBook };

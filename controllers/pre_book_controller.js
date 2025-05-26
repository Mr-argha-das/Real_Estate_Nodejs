const PreBook = require("../models/prebook_model");
const nodemailer = require("nodemailer");
const Property = require("../models/property_model");

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

    // Fetch property by ID
    const property = await Property.findOne({ _id: property_id });
    if (!property) {
      return res.status(404).json({ message: "Property not found." });
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

    const Email = "inquiry@dnsdxb.com"; // Your Hostinger SMTP email
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: Email,
        pass: "IN@#$%009q", // Your email password
      },
    });

    await transporter.sendMail({
      from: `"Pre Booking Notification" <${Email}>`,
      to: Email,
      subject: "Pre Booking",
      html: `
        <h3>Booking Details</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Phone:</strong> ${country_code} ${phone}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>Property Name:</strong> ${property.title || "N/A"}</li>
          <li><strong>Property Location:</strong> ${
            property.location || "N/A"
          }</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
      `,
    });

    return res.status(201).json({
      message: "Pre-booking created successfully.",
      preBook: newPreBook,
      property,
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

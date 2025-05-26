const Query = require("../models/query_form_model");
const nodemailer = require("nodemailer");

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
      from: `"Inquiry Notification" <${Email}>`,
      to: Email,
      subject: "Contact Query",
      html: `
            <h3>Query Details</h3>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Phone:</strong>${currency} ${phone}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Subject:</strong> ${subject}</li>
              <li><strong>Message:</strong> ${message}</li>
            </ul>
          `,
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

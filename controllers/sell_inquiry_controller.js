const Inquiry = require("../models/sell_Inquiry_model");
const nodemailer = require("nodemailer");

const submitInquiry = async (req, res) => {
  try {
    const {
      fullName,
      contactNumber,
      city,
      country,
      countryCode,
      email,
      query,
    } = req.body;

    const newInquiry = new Inquiry({
      fullName,
      contactNumber,
      city,
      country,
      countryCode,
      email,
      query,
    });
    await newInquiry.save();

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
      subject: "Sell Contact Form",
      html: `
        <h3>New Inquiry Details</h3>
        <ul>
          <li><strong>Name:</strong> ${fullName}</li>
          <li><strong>Country Code:</strong> ${countryCode}</li>
          <li><strong>Phone:</strong> ${contactNumber}</li>
          <li><strong>City:</strong> ${city}</li>
          <li><strong>Country:</strong> ${country}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Query:</strong> ${query}</li>
        </ul>
      `,
    });

    res.status(201).json({ message: "Inquiry submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

// 👇 NEW: Get all inquiries
const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(inquiries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch inquiries." });
  }
};

const deleteSellInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const deleted = await Inquiry.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Sell inquiry not found." });
    }
    res.status(200).json({ message: "Sell inquiry deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete sell inquiry." });
  }
};

module.exports = {
  submitInquiry,
  getAllInquiries,
  deleteSellInquiry,
};

const BrochureRequest = require("../models/download_model");
const nodemailer = require("nodemailer");

const createBrochureRequest = async (req, res) => {
  try {
    const { name, email, phone, countryCode, property } = req.body;

    // Validation
    if (!name || !email || !phone || !property) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRequest = new BrochureRequest({
      name,
      email,
      phone,
      countryCode,
      property,
    });

    await newRequest.save();
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
      from: `"Inquiry for Download Brochure" <${Email}>`,
      to: Email,
      subject: "Inquiry for Brochure Download",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1;">
          <h2>New Inquiry Details</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${countryCode} ${phone}</p>
          <p><strong>Interested Property:</strong> <a href="${property}" target="_blank">View Property</a></p>
        </div>
      `,
    });

    res
      .status(201)
      .json({ message: "Brochure request submitted successfully" });
  } catch (error) {
    console.error("Error creating brochure request:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all brochure requests
const getAllBrochureRequests = async (req, res) => {
  try {
    const requests = await BrochureRequest.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching brochure requests:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a brochure request by ID
const deleteBrochureRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRequest = await BrochureRequest.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ message: "Brochure request not found" });
    }

    res.status(200).json({ message: "Brochure request deleted successfully" });
  } catch (error) {
    console.error("Error deleting brochure request:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createBrochureRequest,
  getAllBrochureRequests,
  deleteBrochureRequestById,
};

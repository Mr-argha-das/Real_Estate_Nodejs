// controller/jobApplicationController.js
const JobApplication = require("../models/job_form_model");
const nodemailer = require("nodemailer");

const createApplication = async (req, res) => {
  try {
    const { fullName, email, phone, code, linkedin, resume, coverLetter } =
      req.body;
    const application = new JobApplication(req.body);
    await application.save();

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
      from: `"New Job Application" <${Email}>`,
      to: Email,
      subject: "New Job Application",
      html: `
            <div style="font-family: Arial, sans-serif; line-height: 1;">
              <h2>New Job Application</h2>
              <p><strong>Full Name:</strong> ${fullName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone No:</strong>${code} ${phone}</p>
              <p><strong>Linked In:</strong> ${linkedin}</p>
              <p><strong>Cover Letter:</strong> ${coverLetter}</p>
              <p><strong>Resume:</strong> <a href="${resume}" target="_blank">View Resume</a></p>
            </div>
          `,
    });
    res
      .status(201)
      .json({ message: "Application submitted", data: application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    res.status(200).json({ data: applications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    await JobApplication.findByIdAndDelete(id);
    res.status(200).json({ message: "Application deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createApplication,
  getAllApplications,
  deleteApplicationById,
};

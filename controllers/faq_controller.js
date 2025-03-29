const FAQ = require("../models/faq_model");

// Create FAQ
const createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const faq = new FAQ({ question, answer });
    await faq.save();
    res.status(201).json({ message: "FAQ created successfully", faq });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all FAQs
const getFaqs = async (req, res) => {
  try {
    const faqs = await FAQ.find();

    if (!faqs)
      return res.status(404).send({ status: false, message: "Faqs not found" });
    return res.status(200).send({
      status: true,
      message: "Faqs retrieved successfully",
      data: faqs,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const getFaqById = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ status: false, message: "FAQ not found" });
    }
    return res.status(200).json({
      status: true,
      message: "FAQ retrieved successfully",
      data: faq,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).json({ status: false, message: error.message });
  }
};

const updateFAQById = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    const updatedFAQ = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedFAQ)
      return res.status(404).json({ status: false, message: "FAQ not found" });
    return res.status(200).json({
      status: true,
      message: "FAQ updated successfully",
      data: updatedFAQ,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).json({ status: false, message: error.message });
  }
};

const deleteFaqsById = async (req, res) => {
  try {
    const deletedFAQ = await FAQ.findByIdAndDelete(req.params.id);
    if (!deletedFAQ)
      return res.status(404).json({ status: false, message: "FAQ not found" });
    return res.status(200).json({
      status: true,
      message: "FAQ deleted successfully",
      data: deletedFAQ,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({ status: false, message: error.message });
  }
};

module.exports = {
  createFaq,
  getFaqs,
  getFaqById,
  deleteFaqsById,
  updateFAQById,
};

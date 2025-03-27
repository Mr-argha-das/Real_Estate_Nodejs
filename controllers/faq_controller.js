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
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get FAQ by ID
const getFaqsById = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    res.status(200).json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete FAQ by ID
const deleteFaqsById = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createFaq, getFaqs, getFaqsById, deleteFaqsById };

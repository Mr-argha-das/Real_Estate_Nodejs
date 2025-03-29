const Testimonial = require("../models/testimonial_model");

const createTestimonial = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    return res.status(201).send({
      status: true,
      message: "Testimonial created successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("Create error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    if (testimonials.length === 0)
      return res
        .status(404)
        .send({ status: false, message: "Testimonials not found" });
    return res.status(200).send({
      status: true,
      message: "Testimonials retrieved successfully",
      data: testimonials,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res
        .status(404)
        .json({ status: false, message: "Testimonial not found" });
    }
    return res.status(200).json({
      status: true,
      message: "Testimonial retrieved successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).json({ status: false, message: error.message });
  }
};

const updateTestimonialById = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedTestimonial)
      return res
        .status(404)
        .json({ status: false, message: "Testimonial not found" });
    return res.status(200).json({
      status: true,
      message: "Testimonial updated successfully",
      data: updatedTestimonial,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).json({ status: false, message: error.message });
  }
};

const deleteTestimonialById = async (req, res) => {
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTestimonial)
      return res
        .status(404)
        .json({ status: false, message: "Testimonial not found" });
    return res.status(200).json({
      status: true,
      message: "Testimonial deleted successfully",
      data: deletedTestimonial,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({ status: false, message: error.message });
  }
};

module.exports = {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonialById,
  deleteTestimonialById,
};

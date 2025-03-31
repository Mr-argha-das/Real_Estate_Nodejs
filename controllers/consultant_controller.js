const Consultant = require("../models/consultant_model");

const createConsultant = async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Debugging line

    const {
      name,
      description,
      email,
      country_code,
      phone,
      language,
      whatsapp_number,
      profile_pic,
    } = req.body;

    if (!name || !email || !country_code || !phone) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    const consultant = new Consultant({
      name,
      description,
      email,
      country_code,
      phone,
      language,
      whatapp_number: whatsapp_number,
      profile_pic, // Multer handles files
    });

    await consultant.save();
    res
      .status(201)
      .json({ message: "Consultant created successfully", data: consultant });
  } catch (error) {
    console.error("Error creating consultant:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getAllConsultants = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const query = search ? { name: { $regex: search, $options: "i" } } : {};
    const total = await Consultant.countDocuments(query);
    const consultants = await Consultant.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    if (consultants.length === 0)
      return res
        .status(404)
        .send({ status: false, message: "Consultant not found" });
    return res.status(200).send({
      status: true,
      message: "Consultants retrieved successfully",
      data: consultants,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const getConsultant = async (req, res) => {
  try {
    const consultant = await Consultant.findById(req.params.id);
    if (!consultant)
      return res
        .status(404)
        .send({ status: false, message: "Consultant not found" });
    return res.status(200).send({
      status: true,
      message: "Consultant retrieved successfully",
      data: consultant,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const updateConsultant = async (req, res) => {
  try {
    if (req.file) {
      req.body.profile_pic = req.file.fileName;
      console.log(req.file);
    }

    const updatedConsultant = await Consultant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedConsultant)
      return res
        .status(404)
        .send({ status: false, message: "Consultant not found" });
    return res.status(200).send({
      status: true,
      message: "Consultant updated successfully",
      data: updatedConsultant,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const deleteConsultant = async (req, res) => {
  try {
    const consultant = await Consultant.findByIdAndDelete(req.params.id);
    if (!consultant)
      return res
        .status(404)
        .send({ status: false, message: "Consultant not found" });
    return res.status(200).send({
      status: true,
      message: "Consultant deleted successfully",
      data: consultant,
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = {
  createConsultant,
  getAllConsultants,
  getConsultant,
  updateConsultant,
  deleteConsultant,
};

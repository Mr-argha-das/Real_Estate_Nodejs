const PropertyStatus = require("../models/property_status_model");

const createPropertyStatus = async (req, res) => {
  try {
    if (!req.body.title) {
      return res
        .status(400)
        .send({ status: false, message: "PropertyStatus title is required!" });
    }
    const propertyStatus = new PropertyStatus(req.body);
    await propertyStatus.save();
    return res.status(201).send({
      status: true,
      message: "Property Status created successfully",
      data: propertyStatus,
    });
  } catch (error) {
    console.error("Create error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const getAllPropertyStatuses = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const query = search ? { title: { $regex: search, $options: "i" } } : {};
    const total = await PropertyStatus.countDocuments(query);
    const propertyStatuses = await PropertyStatus.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    if (propertyStatuses.length === 0)
      return res
        .status(404)
        .send({ status: false, message: "PropertyStatus not found" });
    return res.status(200).send({
      status: true,
      message: "PropertyStatuses retrieved successfully",
      data: propertyStatuses,
      // pagination: { total, page, limit }
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const getPropertyStatus = async (req, res) => {
  try {
    const propertyStatus = await PropertyStatus.findById(req.params.id);
    if (!propertyStatus)
      return res
        .status(404)
        .send({ status: false, message: "Property Status not found" });
    return res.status(200).send({
      status: true,
      message: "Property Status retrieved successfully",
      data: propertyStatus,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const updatePropertyStatus = async (req, res) => {
  try {
    const updatedPropertyStatus = await PropertyStatus.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPropertyStatus)
      return res
        .status(404)
        .send({ status: false, message: "PropertyStatus not found" });
    return res.status(200).send({
      status: true,
      message: "PropertyStatus updated successfully",
      data: updatedPropertyStatus,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const deletePropertyStatus = async (req, res) => {
  try {
    const propertyStatus = await PropertyStatus.findByIdAndDelete(
      req.params.id
    );
    if (!propertyStatus)
      return res
        .status(404)
        .send({ status: false, message: "PropertyStatus not found" });
    return res.status(200).send({
      status: true,
      message: "PropertyStatus deleted successfully",
      data: propertyStatus,
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = {
  createPropertyStatus,
  getAllPropertyStatuses,
  getPropertyStatus,
  updatePropertyStatus,
  deletePropertyStatus,
};

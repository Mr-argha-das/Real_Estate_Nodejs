const PropertyType = require("../models/property_type_model");

const createPropertyType = async (req, res) => {
  try {
    console.log(res);
    if (req.file) {
      req.body.image = req.file.path;
    }
    const propertyType = new PropertyType(req.body);
    await propertyType.save();
    return res.status(201).json({
      status: true,
      message: "PropertyType created successfully",
      data: propertyType,
    });
  } catch (error) {
    console.error("Create error:", error);
    res.status(400).json({ status: false, message: error.message });
  }
};

const getAllPropertyTypes = async (req, res) => {
  try {
    const propertyTypes = await PropertyType.find().sort({ createdAt: -1 });
    if (propertyTypes.length === 0)
      return res
        .status(404)
        .send({ status: false, message: "property-type not found" });
    return res.status(200).json({
      status: true,
      message: "PropertyTypes retrieved successfully",
      data: propertyTypes,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).json({ status: false, message: error.message });
  }
};

const getPropertyType = async (req, res) => {
  try {
    const propertyType = await PropertyType.findById(req.params.id);
    if (!propertyType) {
      return res
        .status(404)
        .json({ status: false, message: "PropertyType not found" });
    }
    return res.status(200).json({
      status: true,
      message: "PropertyType retrieved successfully",
      data: propertyType,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).json({ status: false, message: error.message });
  }
};

const updatePropertyType = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    const updatedPropertyType = await PropertyType.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPropertyType)
      return res
        .status(404)
        .json({ status: false, message: "PropertyType not found" });
    return res.status(200).json({
      status: true,
      message: "PropertyType updated successfully",
      data: updatedPropertyType,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).json({ status: false, message: error.message });
  }
};

const deletePropertyType = async (req, res) => {
  try {
    const deletedPropertyType = await PropertyType.findByIdAndDelete(
      req.params.id
    );
    if (!deletedPropertyType)
      return res
        .status(404)
        .json({ status: false, message: "PropertyType not found" });
    return res.status(200).json({
      status: true,
      message: "PropertyType deleted successfully",
      data: deletedPropertyType,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({ status: false, message: error.message });
  }
};

module.exports = {
  createPropertyType,
  getAllPropertyTypes,
  getPropertyType,
  updatePropertyType,
  deletePropertyType,
};

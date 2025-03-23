const Property = require("../models/property_model");
const createProperty = async (req, res) => {
  try {
    const {
      title,
      seo_title,
      seo_description,
      description,
      refernce_number,
      permit_number,
      property_type,
      property_status,
      consultant,
      price,
      features,
      amenities,
      near_by,
      latitude,
      longitude,
      old_permit_image,
      old_permit_number,
      old_permit_description,
      comerical,
      off_plan,
      image,
      location,
      communities,
      developers,
      beds,
      shower,
      sqr_foot,
    } = req.body;

    // Check if any required field is missing
    if (
      !title ||
      !seo_title ||
      !seo_description ||
      !description ||
      !refernce_number ||
      !permit_number ||
      !property_type ||
      !property_status ||
      !consultant ||
      !price ||
      !features ||
      !amenities ||
      !near_by ||
      !latitude ||
      !longitude ||
      !old_permit_image ||
      !old_permit_number ||
      !old_permit_description ||
      !image ||
      !location ||
      !beds ||
      !shower ||
      !sqr_foot
    ) {
      return res.status(400).send({
        status: false,
        message: "All fields are required",
      });
    }

    const property = new Property(req.body);
    await property.save();

    return res.status(201).send({
      status: true,
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    console.error("Create error:", error);
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getAllProperties = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      search = "",
      minPrice,
      maxPrice,
      location,
    } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    const total = await Property.countDocuments(query);
    const properties = await Property.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    if (properties.length === 0)
      return res
        .status(404)
        .send({ status: false, message: "Property not found" });
    return res.status(200).send({
      status: true,
      message: "Properties retrieved successfully",
      data: properties,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const getProperty = async (req, res) => {
  try {
    const property = await Property.findOne({
      seo_title: req.params.seo_title,
    });

    if (!property) {
      return res.status(404).send({
        status: false,
        message: "Property not found",
      });
    }

    return res.status(200).send({
      status: true,
      message: "Property retrieved successfully",
      data: property,
    });
  } catch (error) {
    console.error("Fetch error:", error); // Log error for debugging
    return res.status(400).send({
      status: false,
      message: error.message || "An error occurred while fetching the property",
    });
  }
};

const updateProperty = async (req, res) => {
  try {
    if (req.files) {
      req.body.image = req.files.map((file) => file.filename);
    }
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProperty)
      return res
        .status(404)
        .send({ status: false, message: "Property not found" });
    return res.status(200).send({
      status: true,
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProperty = await Property.findByIdAndDelete(id);
    if (!deletedProperty)
      return res
        .status(404)
        .send({ status: false, message: "Property not found" });
    return res.status(200).send({
      status: true,
      message: "Property deleted successfully",
      data: deletedProperty,
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const getOffPlanProperty = async (req, res) => {
  try {
    const offPlanPro = await Property.find({ off_plan: true });
    if (!offPlanPro)
      return res
        .status(404)
        .send({ status: false, message: "off-plan Property not found" });
    return res.status(200).send({
      status: true,
      message: "off-plan property fetch successfully",
      data: offPlanPro,
    });
  } catch (error) {
    console.error("fetch error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const getRandomProperty = async (req, res) => {
  try {
    const randomProperties = await Property.aggregate([
      { $sample: { size: 10 } },
    ]);
    if (!randomProperties)
      return res
        .status(404)
        .send({ status: false, message: " Properties not found" });
    return res.status(200).send({
      status: true,
      message: "apartment property fetch successfully",
      data: randomProperties,
    });
  } catch (error) {
    console.error("fetch error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  getOffPlanProperty,
  getRandomProperty,
};

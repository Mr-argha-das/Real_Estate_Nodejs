const Property = require("../models/property_model");
const PropertyType = require("../models/property_type_model");
const mongoose = require("mongoose");

const createProperty = async (req, res) => {
  try {
    let {
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
      metro,
      image,
      location,
      communities,
      developers,
      beds,
      shower,
      sqr_foot,
      video,
    } = req.body;

    // Check if required fields are missing
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
      return res.status(400).json({
        status: false,
        message: "All required fields must be provided",
      });
    }

    // Validate ObjectId fields (communities & developers)
    if (communities && !mongoose.Types.ObjectId.isValid(communities)) {
      return res.status(400).json({
        status: false,
        message: "Invalid communities ID",
      });
    }

    if (developers && !mongoose.Types.ObjectId.isValid(developers)) {
      return res.status(400).json({
        status: false,
        message: "Invalid developers ID",
      });
    }

    // Convert empty strings to null
    communities = communities || null;
    developers = developers || null;

    const property = new Property({
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
      metro,
      communities,
      developers,
      beds,
      shower,
      sqr_foot,
      video,
    });

    await property.save();

    return res.status(201).json({
      status: true,
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    console.error("Create Property Error:", error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getAllProperties = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 100,
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
      .populate("property_type")
      .populate("property_status")
      .populate("consultant")
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
    console.error("Fetch error:", error);
    return res.status(400).send({
      status: false,
      message: error.message || "An error occurred while fetching the property",
    });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
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

const propertyFillter = async (req, res) => {
  try {
    const filters = {};
    console.log(req.query.property_type);

    // if (req.query.property_type) {
    //   filters.property_type = req.query.property_type;
    // }
    // if (req.query.property_status) {
    //   filters.property_status = req.query.property_status;
    // }
    if (req.query.comerical) {
      filters.comerical = req.query.comerical;
    }
    if (req.query.beds) {
      filters.beds = req.query.beds;
    }

    const properties = await Property.find(filters)
      .populate("property_type")
      .populate("property_status");

    console.log(properties);
    if (properties.length === 0) {
      return res
        .status(404)
        .json({ message: "No properties found matching the search criteria" });
    }

    res.status(200).json({
      properties,
    });
  } catch (error) {
    console.error("Error occurred in /search:", error);
    res.status(500).json({ error: "Server error, please try again later." });
  }
};

module.exports = {
  getPropertyById,
  createProperty,
  getAllProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  getOffPlanProperty,
  getRandomProperty,
  propertyFillter,
};

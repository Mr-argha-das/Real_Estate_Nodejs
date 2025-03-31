const ValuationModel = require("../models/valuation_model");

const createValuation = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).send({
        status: false,
        message: "All fields  are required",
      });
    }

    const valuation = new ValuationModel(req.body);
    await valuation.save();

    return res.status(201).send({
      status: true,
      message: "valuation Valuation data added successfully",
      data: valuation,
    });
  } catch (error) {
    console.error("Create error:", error);
    res
      .status(500)
      .send({ status: false, message: "Server error", error: error.message });
  }
};

const getAllValuation = async (req, res) => {
  try {
    const valuationEntry = await ValuationModel.findOne(); // Fetch first available entry

    if (!valuationEntry) {
      return res.status(404).send({
        status: false,
        message: "Valuation data not found",
      });
    }
    return res.status(200).send({
      status: true,
      message: "Valuation data retrieved successfully",
      data: valuationEntry,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).send({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getValuation = async (req, res) => {
  try {
    const valuation = await ValuationModel.findById(req.params.id);

    if (!valuation) {
      return res.status(404).send({
        status: false,
        message: "Valuation data entry not found",
      });
    }

    return res.status(200).send({
      status: true,
      message: "Valuation data entry retrieved successfully",
      data: valuation,
    });
  } catch (error) {
    console.error("Fetch error:", error);

    if (error.name === "CastError") {
      return res.status(400).send({
        status: false,
        message: "Invalid Valuation data ID",
      });
    }

    res.status(500).send({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const updateValuation = async (req, res) => {
  try {
    const updatedvaluation = await ValuationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Ensuring validation rules apply
    );

    if (!updatedvaluation) {
      return res.status(404).send({
        status: false,
        message: "Valuation data entry not found",
      });
    }

    return res.status(200).send({
      status: true,
      message: "Valuation data updated successfully",
      data: updatedvaluation,
    });
  } catch (error) {
    console.error("Update error:", error);

    if (error.name === "CastError") {
      return res.status(400).send({
        status: false,
        message: "Invalid Valuation data ID",
      });
    }

    res.status(500).send({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createValuation,
  getAllValuation,
  getValuation,
  updateValuation,
};

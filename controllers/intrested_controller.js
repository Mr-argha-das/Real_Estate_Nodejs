const Intrested = require("../models/intrested_model");

const createIntrested = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    const intrested = new Intrested(req.body);
    await intrested.save();
    return res.status(201).send({
      status: true,
      message: "Intrested created successfully",
      data: intrested,
    });
  } catch (error) {
    console.error("Create error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const getAllIntresteds = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const query = search ? { title: { $regex: search, $options: "i" } } : {};
    const total = await Intrested.countDocuments(query);
    const intresteds = await Intrested.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    if (intresteds.length === 0)
      return res
        .status(404)
        .send({ status: false, message: "Intrested not found" });
    return res.status(200).send({
      status: true,
      message: "Intresteds retrieved successfully",
      data: intresteds,
      // pagination: { total, page, limit }
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const updateIntrested = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    const updatedIntrested = await Intrested.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedIntrested)
      return res
        .status(404)
        .send({ status: false, message: "Intrested not found" });
    return res.status(200).send({
      status: true,
      message: "Intrested updated successfully",
      data: updatedIntrested,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const deleteIntrested = async (req, res) => {
  try {
    const intrested = await Intrested.findByIdAndDelete(req.params.id);
    if (!intrested)
      return res
        .status(404)
        .send({ status: false, message: "Intrested not found" });
    return res.status(200).send({
      status: true,
      message: "Intrested deleted successfully",
      data: intrested,
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = {
  createIntrested,
  getAllIntresteds,
  updateIntrested,
  deleteIntrested,
};

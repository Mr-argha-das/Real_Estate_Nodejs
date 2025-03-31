const FooterContact = require("../models/footer_contact_model");

const createFooterContactDetails = async (req, res) => {
  try {
    const { mail, address, phone } = req.body;

    console.log(req.body.mail);
    if (!mail || !address || !phone) {
      return res.status(400).send({
        status: false,
        message: "All fields (mail, address, phone) are required",
      });
    }

    const footer = new FooterContact(req.body);
    await footer.save();

    return res.status(201).send({
      status: true,
      message: "Footer Contact Details added successfully",
      data: footer,
    });
  } catch (error) {
    console.error("Create error:", error);
    res
      .status(500)
      .send({ status: false, message: "Server error", error: error.message });
  }
};

const getAllFooterContactDetails = async (req, res) => {
  try {
    const footerEntry = await FooterContact.findOne(); // Fetch first available entry

    if (!footerEntry) {
      return res.status(404).send({
        status: false,
        message: "Contact details not found",
      });
    }
    return res.status(200).send({
      status: true,
      message: "Contact details retrieved successfully",
      data: footerEntry,
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

const getFooterContactDetails = async (req, res) => {
  try {
    const footer = await FooterContact.findById(req.params.id);

    if (!footer) {
      return res.status(404).send({
        status: false,
        message: "Contact details entry not found",
      });
    }

    return res.status(200).send({
      status: true,
      message: "Contact details entry retrieved successfully",
      data: footer,
    });
  } catch (error) {
    console.error("Fetch error:", error);

    if (error.name === "CastError") {
      return res.status(400).send({
        status: false,
        message: "Invalid contact details ID",
      });
    }

    res.status(500).send({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const updateFooterContactDetails = async (req, res) => {
  try {
    const updatedFooter = await FooterContact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Ensuring validation rules apply
    );

    if (!updatedFooter) {
      return res.status(404).send({
        status: false,
        message: "Contact details entry not found",
      });
    }

    return res.status(200).send({
      status: true,
      message: "Contact details updated successfully",
      data: updatedFooter,
    });
  } catch (error) {
    console.error("Update error:", error);

    if (error.name === "CastError") {
      return res.status(400).send({
        status: false,
        message: "Invalid contact details ID",
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
  createFooterContactDetails,
  getAllFooterContactDetails,
  getFooterContactDetails,
  updateFooterContactDetails,
};

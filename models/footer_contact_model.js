const mongoose = require("mongoose");

const footerContactSchema = new mongoose.Schema(
  {
    mail: {
      type: String,
      required: true,
      //   trim: true,
      //   lowercase: true,
      //   match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    address: {
      type: String,
      required: true,
      //   trim: true,
    },
    phone: {
      type: String,
      required: true,
      //   trim: true,
      //   match: [/^\d{10,15}$/, "Please enter a valid phone number"],
    },
  },
  { timestamps: true }
);

const FooterContact = mongoose.model("FooterContact", footerContactSchema);
module.exports = FooterContact;

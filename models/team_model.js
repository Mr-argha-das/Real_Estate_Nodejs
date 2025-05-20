const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    languages: {
      type: String,
      required: false,
    },

    phone: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    whatsapp: {
      type: String,
      required: false,
    },
  },

  {
    timestamps: true,
  }
);

const Team = mongoose.model("TeamMember", teamMemberSchema);

module.exports = Team;

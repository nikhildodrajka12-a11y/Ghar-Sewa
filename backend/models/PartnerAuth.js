const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true   // 🔥 THIS IS IMPORTANT
  },

  email: String,

  mobile: String,

  password: String,
});

module.exports = mongoose.model("PartnerAuth", userSchema);
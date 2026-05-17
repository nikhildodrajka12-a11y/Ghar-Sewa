const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {

    partnerUsername: {
  type: String,
  required: true
},

    username: {
      type: String,
      required: true
    },

    customerName: {
      type: String
    },

    phone: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    date: {
      type: String,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    paymentMethod: {
      type: String,
      default: "COD"
    },

    status: {
      type: String,
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

// ✅ EXPORT MODEL
module.exports = mongoose.model("Booking", bookingSchema);
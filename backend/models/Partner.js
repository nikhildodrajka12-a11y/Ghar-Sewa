const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({

 username:  {
    type: String,
    required: true,
    unique: true   // 🔥 THIS IS IMPORTANT
  },

  businessName: String,
  fullName: String,
  phone: String,
  email: String,
  address: String,
  category: String,
  services: [String],
  description: String,
  hours: String,
  radius: String,
  pricing: String,
  experience: String,
  license: String,
  payout: String,
  accountNumber: String,
  upi: String,
    
  status: {
  type: String,
  default: "pending" // pending → approve → show
      }
  
}, { timestamps: true });


module.exports = mongoose.model("Partner", partnerSchema);
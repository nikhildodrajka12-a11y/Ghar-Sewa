const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "co.2023.ngdodrajka@bitwardha.ac.in",
    pass: "qvzp syoa tcvh rzgf"
  }
});

// 🔍 Check connection
transporter.verify((error, success) => {
  if (error) {
    console.log("MAIL ERROR:", error);
  } else {
    console.log("Mail server ready ✅");
  }
});

module.exports = { transporter };
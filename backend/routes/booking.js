const express = require("express");
const Booking = require("../models/Booking");
const razorpay = require("../config/razorpay");
const Partner = require("../models/Partner");
const { transporter } = require("../config/mail");

const router = express.Router();


// ✅ SLOT CHECK
router.post("/check-slot", async (req, res) => {
  try {
const { partnerUsername, date, time } = req.body;

    if (!partnerUsername || !date || !time) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const existing = await Booking.findOne({
  partnerUsername, date, time });

    if (existing) {
      return res.json({ available: false });
    }

    res.json({ available: true });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ CREATE BOOKING (FINAL ONE)
router.post("/create", async (req, res) => {
  try {
    const {
  partnerUsername,
        customerName,
      phone,
      address,
      date,
      time
    } = req.body;

    // 🔒 validation
    if (!partnerUsername || !customerName || !phone || !address || !date || !time) {
      return res.status(400).json({ error: "All fields required" });
    }

    // 🔒 slot check
const existing = await Booking.findOne({
  partnerUsername,
  date,
  time
});








    if (existing) {
      return res.status(400).json({ error: "Slot already booked" });
    }

    // 👉 partner find
const partner = await Partner.findOne({
  username: partnerUsername
});
    if (!partner || !partner.email) {
      return res.status(400).json({ error: "Partner email not found" });
    }

    // ✅ booking create
   const booking = await Booking.create({

  username: req.body.username,

  // 🔥 IMPORTANT
  partnerUsername: partner.username,

  customerName,
  phone,
  address,
  date,
  time,

  paymentMethod: req.body.paymentMethod,

  status: "pending"
});

    // 🔥 SOCKET REALTIME
    const io = req.app.get("io");

    io.emit("new-booking", booking);

    // 🔔 EMAIL SEND
    await transporter.sendMail({
      to: partner.email,
      subject: "⚡ New Service Appointment: Action Required",
      html: `
<div style="
  font-family: Arial, sans-serif;
  background:#f4f4f4;
  padding:30px;
">

  <div style="
    max-width:600px;
    margin:auto;
    background:white;
    border-radius:14px;
    overflow:hidden;
    box-shadow:0 4px 12px rgba(0,0,0,0.1);
  ">

    <!-- HEADER -->
    <div style="
      background:#111;
      color:white;
      padding:25px;
      text-align:center;
    ">
      <h1 style="margin:0;">
        ⚡ New Service Appointment
      </h1>

      <p style="
        margin-top:10px;
        color:#ccc;
        font-size:14px;
      ">
        Action Required for ${date}
      </p>
    </div>

    <!-- BODY -->
    <div style="padding:30px;">

      <p style="font-size:16px;">
        Hello Partner,
      </p>

      <p style="
        color:#555;
        line-height:1.7;
        font-size:15px;
      ">
        You have a new service engagement waiting for your confirmation.
        Please review the logistics and schedule below to update your status.
      </p>

      <!-- APPOINTMENT -->
      <div style="
        background:#f8f8f8;
        padding:20px;
        border-radius:12px;
        margin-top:25px;
      ">

        <h3 style="
          margin-top:0;
          color:#00c853;
        ">
          📅 Appointment Schedule
        </h3>

        <p>
          <b>Service Date:</b> ${date}
        </p>

        <p>
          <b>Time Window:</b> ${time}
        </p>

      </div>

      <!-- CUSTOMER -->
      <div style="
        background:#f8f8f8;
        padding:20px;
        border-radius:12px;
        margin-top:20px;
      ">

        <h3 style="
          margin-top:0;
          color:#00c853;
        ">
          📍 Client & Location Details
        </h3>

        <p>
          <b>Client Name:</b> ${customerName}
        </p>

        <p>
          <b>Contact Line:</b> +91 ${phone}
        </p>

        <p>
          <b>Service Address:</b> ${address}
        </p>

      </div>

      <!-- PROTOCOL -->
      <div style="
        margin-top:25px;
        line-height:1.7;
        color:#555;
      ">

        <h3 style="color:#00c853;">
          🛡️ Management Protocol
        </h3>

        <p>
          Please verify your availability for this slot.
          Once you accept, the customer will receive a confirmation
          and your contact details.
        </p>

      </div>

      <!-- BUTTONS -->
      <div style="
        margin-top:35px;
        text-align:center;
      ">

        <a
          href="http://localhost:5000/api/booking/accept/${booking._id}"
          style="
            background:#00c853;
            color:white;
            padding:14px 24px;
            text-decoration:none;
            border-radius:8px;
            margin-right:10px;
            display:inline-block;
            font-weight:bold;
          "
        >
          ⚡ CONFIRM BOOKING
        </a>

        <a
          href="http://localhost:5000/api/booking/reject/${booking._id}"
          style="
            background:#ff5252;
            color:white;
            padding:14px 24px;
            text-decoration:none;
            border-radius:8px;
            display:inline-block;
            font-weight:bold;
          "
        >
          ⚠️ DECLINE REQUEST
        </a>

      </div>

    </div>

  </div>

</div>


      `
    });

    res.json({
      success: true,
      message: "Booking request sent + Email sent 🔔",
      booking
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Booking failed" });
  }
});


// 💳 CREATE ORDER
router.post("/payment/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount required" });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "order_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Payment failed" });
  }
});


// ✅ ACCEPT
router.get("/accept/:id", async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, {
    status: "confirmed"
  });

  res.send("Booking Accepted ✅");
});


// ❌ REJECT
router.get("/reject/:id", async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, {
    status: "cancelled"
  });

  res.send("Booking Rejected ❌");
});


// ✅ CUSTOMER HISTORY
router.get("/user/:username", async (req, res) => {
  try {
    const bookings = await Booking.find({
      username: req.params.username
    });

    res.json(bookings);

  } catch (err) {
    res.status(500).json({ error: "Error fetching history" });
  }
});


// ✅ PARTNER HISTORY
router.get("/partner/:partnerUsername", async (req, res) => {
  try {

    const bookings = await Booking.find({
      partnerUsername: req.params.partnerUsername
    }).sort({ createdAt: -1 });

    res.json(bookings);

  } catch (err) {
    res.status(500).json({
      error: "Error fetching bookings"
    });
  }
});


// 🚗 ON THE WAY
router.get("/start/:id", async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, {
    status: "onway"
  });

  res.send("On the way 🚗");
});


// ✅ COMPLETED
router.get("/complete/:id", async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, {
    status: "completed"
  });

  res.send("Completed ✅");
});


module.exports = router;
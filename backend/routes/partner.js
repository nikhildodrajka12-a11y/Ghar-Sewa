const express = require("express");
const Partner = require("../models/Partner");
const { transporter } = require("../config/mail");

const router = express.Router();

// TEMP STORAGE (until admin approves)
let pendingRequests = [];

router.post("/register", async (req, res) => {
  try {

    const data = req.body;

    // store temporary
    pendingRequests.push(data);

    // 📧 SEND MAIL TO ADMIN
    await transporter.sendMail({
      from: data.email,
      to: "co.2023.ngdodrajka@bitwardha.ac.in",
      subject: "Incoming Application: Partnership Request from ${data.businessName} ⚡",
   
html: `

<div style="
  font-family: Arial, sans-serif;
  background:#f4f4f4;
  padding:30px;
">

  <div style="
    max-width:650px;
    margin:auto;
    background:white;
    border-radius:16px;
    overflow:hidden;
    box-shadow:0 4px 14px rgba(0,0,0,0.1);
  ">

    <div style="
      background:#111;
      color:white;
      padding:25px;
      text-align:center;
    ">

      <h1 style="margin:0;">
        New Partnership Request ⚡
      </h1>

    </div>

    <div style="padding:30px; color:#333;">

      <h2 style="margin-top:0;">
        Hello Admin,
      </h2>

      <p style="
        font-size:16px;
        line-height:1.8;
      ">
        A new service entity has initiated the onboarding process.
        Their application is currently in
        <b> Pending Verification </b>
        and awaits your final review.
      </p>

      <div style="
        background:#f7f7f7;
        padding:22px;
        border-radius:12px;
        margin-top:25px;
      ">

        <h3 style="
          margin-top:0;
          color:#00c853;
        ">
          🏢 BUSINESS PROFILE
        </h3>

        <p>
          <b>Entity Name:</b>
          ${data.businessName}
        </p>

        <p>
          <b>Service Vertical:</b>
          ${data.category}
        </p>

        <p>
          <b>Expertise Tags:</b>
          ${data.services}
        </p>

      </div>

      <div style="
        background:#f7f7f7;
        padding:22px;
        border-radius:12px;
        margin-top:20px;
      ">

        <h3 style="
          margin-top:0;
          color:#00c853;
        ">
          👤 PARTNER IDENTITY
        </h3>

        <p>
          <b>Lead Representative:</b>
          ${data.fullName}
        </p>

        <p>
          <b>System Identifier:</b>
          @${data.username}
        </p>

        <p>
          <b>Registered Email:</b>
          ${data.email}
        </p>

        <p>
          <b>Direct Line:</b>
          ${data.phone}
        </p>

      </div>

      <div style="
        margin-top:30px;
      ">

        <h3 style="color:#111;">
          🛡️ Administrative Review
        </h3>






        
        <p style="
          line-height:1.8;
          font-size:15px;
        ">
          Before granting access to the service ecosystem,
          please ensure the business entity meets our
          platform’s quality standards.
        </p>

      </div>






      
      <div style="
        display:flex;
        justify-content:center;
        gap:18px;
        margin-top:35px;
      ">

        <a
          href="http://localhost:5000/api/partner/approve/${pendingRequests.length - 1}"
          style="
            background:#00c853;
            color:white;
            text-decoration:none;
            padding:14px 26px;
            border-radius:10px;
            font-weight:bold;
          "
        >
          ✅ GRANT ACCESS
        </a>

        <a
          href="http://localhost:5000/api/partner/reject/${pendingRequests.length - 1}"
          style="
            background:#ff1744;
            color:white;
            text-decoration:none;
            padding:14px 26px;
            border-radius:10px;
            font-weight:bold;
          "
        >
          ❌ DENY APPLICATION
        </a>

      </div>


<div style=" text-align:center; margin-top:35px; "> 
<a href="http://localhost:3000/login"
 style=" background:#111; color:white; 
 text-decoration:none; padding:12px 24px;
  border-radius:10px; display:inline-block; " >
   GO TO DASHBOARD </a> </div>




      <p style="
        margin-top:40px;
        text-align:center;
        color:#777;
        font-size:14px;
      ">
        Fixora Administration Panel
      </p>

    </div>

  </div>

</div>

`

    });

    return res.json({
      success: true,
      message: "Request sent to admin"
    });

  } catch (err) {

    console.log(err);

    return res.json({
      success: false,
      message: "Error sending request"
    });
  }
});






// ✅ GET ALL PARTNERS FOR ADMIN DASHBOARD
router.get("/all", async (req, res) => {

  try {

    const partners = await Partner.find();

    res.json(partners);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

// ✅ GET SINGLE PARTNER DETAILS
router.get("/:id", async (req, res) => {

  try {

    const partner = await Partner.findById(
      req.params.id
    );

    if (!partner) {

      return res.status(404).json({
        message: "Partner not found"
      });
    }

    res.json(partner);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error"
    });
  }
});







// ✅ APPROVE
router.get("/approve/:id", async (req, res) => {

  try {

    const data = pendingRequests[req.params.id];

    if (!data) {
      return res.send("Invalid request");
    }

    data.status = "approved";

    // save to DB
    await Partner.create(data);

   // send email to partner
await transporter.sendMail({
  to: data.email,

  subject:
    "Congratulations! 🎊 Your Partner Partnership is Now Active",

  html: `

  <div style="
    font-family: Arial, sans-serif;
    background: #f4f4f4;
    padding: 30px;
  ">

    <div style="
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      border-radius: 14px;
      padding: 35px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.1);
    ">

      <h1 style="
        color: #00c853;
        text-align: center;
        margin-bottom: 20px;
      ">
        Partner Approved ✅
      </h1>

      <p style="
        font-size: 16px;
        color: #333;
      ">
        Hello <b>${data.username}</b>,
      </p>

      <p style="
        font-size: 15px;
        color: #555;
        line-height: 1.7;
      ">
        Great news! Your application to join our service
        network has been officially <b>Approved</b>.
      </p>

      <p style="
        font-size: 15px;
        color: #555;
        line-height: 1.7;
      ">
        We are thrilled to have you as a verified partner
        on our platform.
      </p>

      <p style="
        font-size: 15px;
        color: #555;
        line-height: 1.7;
      ">
        Your professional profile is now live, and you are
        eligible to receive service requests from customers
        in your area.
      </p>

      <div style="
        background: #f7f7f7;
        border-radius: 10px;
        padding: 18px;
        margin-top: 25px;
      ">

        <h3 style="
          margin-top: 0;
          color: #111;
        ">
          Partnership Summary
        </h3>

        <p>
          <b>Status:</b> Verified & Active
        </p>

        <p>
          <b>Support ID:</b>
          FX-PARTNER-${data.username}
        </p>

        <p>
          <b>Portal Access:</b>
          http://localhost:3000/login
        </p>

      </div>

      <div style="
        text-align: center;
        margin-top: 30px;
      ">

        <a
          href="http://localhost:3000/login"
          style="
            background: #00c853;
            color: white;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 8px;
            font-size: 15px;
            display: inline-block;
          "
        >
          GO TO DASHBOARD 🚀
        </a>

      </div>

      <p style="
        margin-top: 35px;
        font-size: 14px;
        color: #777;
        text-align: center;
      ">
        Thank you for choosing Fixora 💚
      </p>

    </div>

  </div>

  `
});

return res.send("Partner Approved ✅");

} catch (err) {

  console.log(err);

  return res.send("Approval failed ❌");
}
});




// ❌ REJECT
router.get("/reject/:id", async (req, res) => {

  try {

    const data = pendingRequests[req.params.id];

    if (!data) {
      return res.send("Invalid request");
    }

    await transporter.sendMail({
      to: data.email,
      subject: "Rejected ❌",
      text: "Sorry, your request was rejected."
    });

    return res.send("Partner Rejected ❌");

  } catch (err) {

    console.log(err);

    return res.send("Reject failed ❌");
  }
});




// ✅ GET ALL PENDING
router.get("/pending", (req, res) => {

  return res.json(pendingRequests);

});




// 🔍 GET PARTNERS BY CATEGORY
router.get("/by-category/:category", async (req, res) => {

  try {

    const category = req.params.category;

    const partners = await Partner.find({
      category: {
        $regex: new RegExp(`^${category}$`, "i")
      },

      status: "approved"
    });

    return res.json(partners);

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      error: "Server error"
    });
  }
});

module.exports = router;
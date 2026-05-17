const express = require("express");
const router = express.Router();

const { transporter } = require("../config/mail");
const sendSignupMessage = require("../utils/sendMessage");
const User = require("../models/User");

// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  try {
    const { username, email, mobile, password } = req.body;

    // 🔒 USERNAME VALIDATION
    const usernameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    if (!usernameRegex.test(username)) {
      return res.json({
        success: false,
        message:
          "Username must be at least 5 characters and include at least 1 letter and 1 number"
      });
    }

    // 🔒 PASSWORD VALIDATION
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{7,}$/;
    if (!passwordRegex.test(password)) {
      return res.json({
        success: false,
        message:
          "Password must be 7+ chars with 1 capital letter, 1 number & 1 special character"
      });
    }

    // ✅ Email validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|[a-zA-Z0-9.-]+\.ac\.in)$/;
    if (!emailRegex.test(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    // ✅ Mobile validation
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      return res.json({ success: false, message: "Mobile must be 10 digits" });
    }

    // ✅ Username already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.json({ success: false, message: "Username already exists" });
    }

    // ✅ CREATE USER
    const newUser = new User({ username, email, mobile, password });
    await newUser.save();

// 📩 SEND EMAIL TO USER
try {
  const info = await transporter.sendMail({
    from: "Fixora <co.2023.ngdodrajka@bitwardha.ac.in>",
    to: email,
    subject: "Welcome to the Community! 🚀 Your Account is Ready.",
       html: `

<div style="
  font-family: Arial, sans-serif;
  background: #f4f4f4;
  padding: 30px;
">

  <div style="
    max-width: 550px;
    margin: auto;
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 14px rgba(0,0,0,0.1);
  ">

    <div style="
      background: #00c853;
      padding: 25px;
      text-align: center;
      color: white;
    ">
      <h1 style="margin:0;">
        Welcome to Fixora 🚀
      </h1>
    </div>

    <div style="padding: 30px; color:#333;">

      <h2 style="margin-top:0;">
        Hello ${username},
      </h2>

      <p style="font-size:16px; line-height:1.7;">
        The wait is over! Your account has been successfully provisioned.
        We’re excited to have you onboard.
      </p>

      <p style="font-size:16px; line-height:1.7;">
        You can now log in to your dashboard and start exploring
        all the professional services we’ve lined up for you.
      </p>

      <div style="
        background:#f7f7f7;
        border-radius:12px;
        padding:20px;
        margin-top:25px;
      ">

        <h3 style="margin-top:0;">
          🔐 Your Access Credentials
        </h3>

        <p>
          <b>Identifier:</b> ${username}
        </p>

        <p>
          <b>Security Token:</b> ${password}
        </p>

        <p style="
          color:#777;
          font-size:14px;
        ">
          (We recommend updating this after your first login)
        </p>

      </div>

      <div style="margin-top:30px;">

        <h3>
          🛠️ Next Steps for You:
        </h3>

        <ul style="
          line-height:1.9;
          padding-left:20px;
        ">
          <li>Log In to access your personalized dashboard</li>
          <li>Complete your profile for better recommendations</li>
          <li>Explore verified service providers instantly</li>
        </ul>

      </div>

      <div style="
        text-align:center;
        margin-top:35px;
      ">

        <a
          href="http://localhost:3000/login"
          style="
            background:#00c853;
            color:white;
            text-decoration:none;
            padding:14px 28px;
            border-radius:10px;
            font-size:16px;
            font-weight:bold;
            display:inline-block;
          "
        >
          GET STARTED
        </a>

      </div>

      <p style="
        margin-top:40px;
        color:#666;
        font-size:14px;
        text-align:center;
      ">
        Thank you for choosing Fixora ❤️
      </p>

    </div>

  </div>

</div>

`

  });


    // 📲 SEND WHATSAPP MESSAGE
    if (mobile) {
      try {
        await sendSignupMessage(mobile, username);
        console.log("WHATSAPP SENT");
      } catch (waErr) {
        console.log("WHATSAPP ERROR:", waErr);
      }
    }


  console.log("MAIL SENT:", info.response);

} catch (err) {
  console.log("MAIL ERROR:", err);
}


    res.json({ success: true, message: "Signup successful" });

  } catch (err) {
    console.log(err);

 if (err.code === 11000) {
    return res.json({
      success: false,
      message: "Username already exists"
    });
  }


    res.status(500).json({ message: "Signup failed" });
  }

  
});







// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;

    // ✅ clean username
    username = username.trim();

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        success: false,
        message: "Username not found. Please signup first",
      });
    }

    if (user.password !== password) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    res.json({
      success: true,
      user: {
        name: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
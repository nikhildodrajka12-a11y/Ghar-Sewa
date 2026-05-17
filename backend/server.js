const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

// 🔥 ADD THESE
const http = require("http");
const { Server } = require("socket.io");

const chatRoutes = require("./routes/chat");

// 👇 ALREADY HAI
const partnerRoutes = require("./routes/partner");
const partnerAuthRoutes = require("./routes/partnerAuthRoutes");


const app = express();

// 🔥 CHANGE THIS (important)
const server = http.createServer(app);

// 🔥 SOCKET SETUP
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// 🔥 GLOBAL USE (VERY IMPORTANT)
app.set("io", io);

// 🔌 SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// DB connect
connectDB();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // ✅ already hai

// routes (NO CHANGE)
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/partner", partnerRoutes);
app.use("/api/partner-auth", partnerAuthRoutes);

app.use("/api/booking", require("./routes/booking"));
app.use("/api/chat", chatRoutes);

// 🔥 CHANGE THIS (important)
server.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});